#! /bin/bash

kubectl create secret --namespace=airbnb generic db-creds --from-literal=username="$1" --from-literal=password="$2" \
--from-literal=host="$3"
