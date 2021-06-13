#! /bin/bash

kubectl create secret generic db-creds --from-literal=MYSQL_USER="$1" --from-literal=MYSQL_PASSWORD="$2" \
--from-literal=HOST="$3" --from-literal=MYSQL_HOSTS_DB="$4" --from-literal=MYSQL_PROPERTIES_DB="$5"

kubectl create secret generic linode-personal-access-token-k8s-autoscaler --from-literal=token="$6"

kubectl create secret docker-registry regcred \
--docker-server="$7" \
--docker-username="$8" \
--docker-password="$9" \
--docker-email="${10}"