VERSION=1.0.0

# KUBERNETES
cluster:
	kind create cluster --config=kind.yaml

load: build
	docker tag properties-api local/properties-api
	kind load docker-image local/properties-api

	docker tag hosts-api local/hosts-api
	kind load docker-image local/hosts-api
	
	docker tag get-data-api local/get-data-api
	kind load docker-image local/get-data-api

	docker tag static-files local/static-files
	kind load docker-image local/static-files

ingress-controller:
	kubectl create namespace ingress-nginx
	helm install --namespace=ingress-nginx ingress-nginx ingress-nginx/ingress-nginx
	kubectl wait --namespace=ingress-nginx --for=condition=Ready --timeout=5m pod -l app.kubernetes.io/name=ingress-nginx

ingress-controller-destroy:
	kubectl delete ns ingress-nginx --force --grace-period=0

deploy-local:
	kubectl --namespace=default apply -f k8s/local

deploy-prod:
	kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
	kubectl --namespace=default apply -f k8s/cloud

destroy-local:
	kubectl --namespace=default delete -f k8s/local

destroy-prod:
	kubectl delete -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
	kubectl --namespace=default delete -f k8s/cloud

forward:
	kubectl config set-context --current --namespace=ingress-nginx
	kubectl port-forward service/ingress-nginx-controller 5000:80

eks:
	eksctl create cluster --config-file eksctl.yaml

eks-destroy:
	eksctl delete cluster --config-file eksctl.yaml

# TESTING
hosts-api-test:
	cd apis/hosts-api && ./tests.sh

properties-api-test:
	cd apis/properties-api && ./tests.sh

test: hosts-api-test properties-api-test

# COMMON
proxy-image:
	cd Dane-Proxy && docker build -t static-files -f Dockerfile.prod .

get-data-image:
	cd apis/get-data-api && go build -o get-data-api .
	cd apis/get-data-api && docker build -t get-data-api .

client:
	yarn run build

seed:
	yarn run seed

# DEVELOPMENT
hosts-image-dev:
	cd apis/hosts-api && go build -o hosts-api .
	cd apis/hosts-api && docker build -f Dockerfile.dev -t hosts-api .

properties-image-dev:
	cd apis/properties-api && go build -o properties-api .
	cd apis/properties-api && docker build -f Dockerfile.dev -t properties-api .

build-dev: client hosts-image-dev properties-image-dev proxy-image get-data-image

compose: build-dev
	docker-compose up --build -d
	sleep 5
	yarn run seed

# PRODUCTION
hosts-image-prod:
	cd apis/hosts-api && go build -o hosts-api .
	cd apis/hosts-api && docker build -f Dockerfile.prod -t hosts-api .    

properties-image-prod:
	cd apis/properties-api && go build -o properties-api .
	cd apis/properties-api && docker build -t properties-api -f Dockerfile.prod .

build-prod: client hosts-image-prod properties-image-prod proxy-image get-data-image

docker-push: build-prod
	docker tag properties-api manedurphy/properties-api:$(VERSION)
	docker push manedurphy/properties-api:$(VERSION)

	docker tag hosts-api manedurphy/hosts-api:$(VERSION)
	docker push manedurphy/hosts-api:$(VERSION)

	docker tag static-files manedurphy/static-files:$(VERSION)
	docker push manedurphy/static-files:$(VERSION)
	
	docker tag get-data-api manedurphy/get-data-api:$(VERSION)
	docker push manedurphy/get-data-api:$(VERSION)

linode-cli:
	docker run --rm -it -v $(shell pwd):/work -w /work --entrypoint /bin/bash manedurphy/linode-cli