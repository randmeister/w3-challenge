const { ApiPromise, WsProvider } = require('@polkadot/api');
const client = require('prom-client');
const http = require('http')
const url = require('url')

const register = new client.Registry()
let api, activeValidatorSetLengthGauge

async function main () {
    activeValidatorSetLengthGauge = new client.Gauge({ name: 'active_validator_set_length', help: 'active_validator_set_length' });
    register.registerMetric(activeValidatorSetLengthGauge)
   
    const wsProvider = new WsProvider('wss://kusama-rpc.polkadot.io');
    api = await ApiPromise.create({ provider: wsProvider });

    // Retrieve the chain & node information
    const [chain, nodeName, nodeVersion] = await Promise.all([
        api.rpc.system.chain(),
        api.rpc.system.name(),
        api.rpc.system.version()
    ]);

    console.log(`Connected to chain ${chain} using ${nodeName} v${nodeVersion}`);

    const server = http.createServer(async (req, res) => {
   
        // Retrieve active validators and write set length to prometheus registry 
       const validators = await api.query.session.validators()
       activeValidatorSetLengthGauge.set(validators.length);
   
       const route = url.parse(req.url).pathname
       if (route === '/metrics') {
         // Return all metrics the Prometheus exposition format
         res.setHeader('Content-Type', client.contentType)
         res.end(await register.metrics())
       }
   })

   server.listen(8080, () => {
        console.log(`Server listening`);
   })

}

main()
.catch(console.error)
