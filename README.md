# w3-challenge

The task consists of creating an application for observing the kusama network https://kusama.network/ and the tooling
for deploying on a kubernetes platform. The solution should be uploaded to a github/gitlab/bitbucket repo, with each
question on a separate branch (question-1, question-2, question-3) and each branch building on top of the previous one
(question-2 is created from question-1 and question-3 is created from question-2).

1.- Write the application code, it should expose prometheus metrics to answer these questions:

* How many validators form the active set?
* If a concrete validator (from a provided list) didn't produce any blocks in the last 40 minutes (since the beginning of the current session), has it sent a heartbeat? Think also about when this "alert" should eventually resolve.
* Was one concrete validator (from a provided list) reported offline in the last session? 

2.- Create a Helm chart for deploying it. Add as many resources as you think could be necessary for using 
it with prometheus-operator (https://github.com/coreos/prometheus-operator). Involve also the AlertManager and define some meaningful alerts.

3.- We want to make the metrics available to an external prometheus instance through a WireGuard VPN
(https://www.wireguard.com/). Assume that the cluster's worker nodes run on ubuntu LTS and the VPN peer is on IPv4
a.b.c.d and its public key is provided.
