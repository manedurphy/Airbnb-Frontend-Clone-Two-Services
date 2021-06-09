proxy-image:
	cd Dane-Proxy && docker build -t static-files -f Dockerfile.prod .

hosts-image-prod:
	cd apis/hosts-api && go build -o hosts-api .
	cd apis/hosts-api && docker build -f Dockerfile.prod -t hosts-api .    

properties-image:
	cd apis/properties-api && go build -o properties-api .
	cd apis/properties-api && docker build -t properties-api .

get-data-image:
	cd apis/get-data-api && go build -o get-data-api .
	cd apis/get-data-api && docker build -t get-data-api .

client:
	yarn run build:local

build: client hosts-image-prod properties-image proxy-image get-data-image


docker-push: build
	docker tag properties-api manedurphy/properties-api
	docker push manedurphy/properties-api

	docker tag hosts-api manedurphy/hosts-api
	docker push manedurphy/hosts-api

	docker tag static-files manedurphy/static-files
	docker push manedurphy/static-files
	
	docker tag get-data-api manedurphy/get-data-api
	docker push manedurphy/get-data-api

load: build
	docker tag properties-api local/properties-api
	kind load docker-image local/properties-api

	docker tag hosts-api local/hosts-api
	kind load docker-image local/hosts-api
	
	docker tag get-data-api local/get-data-api
	kind load docker-image local/get-data-api

	docker tag static-files local/static-files
	kind load docker-image local/static-files

cluster:
	kind create cluster --config=kind.yaml

ingress-controller:
	kubectl create namespace ingress-nginx
	helm install --namespace=ingress-nginx ingress-nginx ingress-nginx/ingress-nginx
	kubectl wait --namespace=ingress-nginx --for=condition=Ready --timeout=5m pod -l app.kubernetes.io/name=ingress-nginx

deploy-local:
	kubectl --namespace=default apply -f k8s/local

deploy-prod:
	kubectl --namespace=default apply -f k8s/aws

destroy-local:
	kubectl --namespace=default delete -f k8s/local

destroy-prod:
	kubectl --namespace=default delete -f k8s/aws

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

# DEVELOPMENT
hosts-image-dev:
	cd apis/hosts-api && go build -o hosts-api .
	cd apis/hosts-api && docker build -f Dockerfile.dev -t hosts-api .   

build-dev: client hosts-image-dev properties-image proxy-image get-data-image

compose: build-dev
	docker-compose up --build -d
	sleep 5
	yarn run seed