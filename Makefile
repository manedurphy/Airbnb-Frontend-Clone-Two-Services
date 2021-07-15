VERSION=1.0.1

# KUBERNETES
cluster:
	kind create cluster --config=kubeconfig/kind.yaml

load: build-dev
	docker tag properties-api local/properties-api
	kind load docker-image local/properties-api

	docker tag hosts-api local/hosts-api
	kind load docker-image local/hosts-api
	
	docker tag get-data-api local/get-data-api
	kind load docker-image local/get-data-api

	docker tag static-files local/static-files
	kind load docker-image local/static-files

mesh:
	linkerd install | kubectl apply -f -
	linkerd viz install | kubectl apply -f -
	linkerd viz dashboard

inject:
	kubectl get deploy -o yaml | linkerd inject - | kubectl apply -f -

uninject:
	kubectl get deploy -o yaml | linkerd uninject - | kubectl apply -f -

ingress-controller:
	kubectl create namespace ingress-nginx
	helm install --namespace=ingress-nginx ingress-nginx ingress-nginx/ingress-nginx
	kubectl wait --namespace=ingress-nginx --for=condition=Ready --timeout=5m pod -l app.kubernetes.io/name=ingress-nginx

ingress-controller-destroy:
	kubectl delete ns ingress-nginx --force --grace-period=0

deploy-local:
	kubectl create namespace airbnb
	scripts/createSecrets.sh ${MYSQL_USER} ${MYSQL_PASSWORD} ${PROD_HOST}
	kubectl --namespace=airbnb apply -f k8s/local

deploy-kind:
	kubectl --namespace=default apply -f k8s/kind/databases.yaml
	kubectl wait --namespace=default --for=condition=Ready --timeout=5m pod -l app=mysql-hosts-deploy
	kubectl wait --namespace=default --for=condition=Ready --timeout=5m pod -l app=mysql-properties-deploy
	kubectl apply -f k8s/kind

deploy-prod:
	kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
	kubectl --namespace=default apply -f k8s/cloud

destroy-local:
	kubectl --namespace=airbnb delete -f k8s/local
	kubectl delete namespace airbnb --force --grace-period=0

destroy-prod:
	kubectl delete -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
	kubectl --namespace=default delete -f k8s/cloud

destroy-kind:
	kubectl delete -f k8s/kind

forward:
	kubectl config set-context --current --namespace=ingress-nginx
	kubectl port-forward service/ingress-nginx-controller 5000:80

# TESTING
hosts-api-test:
	cd apis/hosts-api && ./tests.sh

properties-api-test:
	cd apis/properties-api && ./tests.sh

test: hosts-api-test properties-api-test

# COMMON
static-files-image:
	cd static-server && docker build -t static-files -f Dockerfile.prod .

get-data-image:
	cd apis/get-data-api && go build -o get-data-api .
	cd apis/get-data-api && docker build -t get-data-api .

webpack:
	yarn run build
	cp -R static-server/dist proxy

seed:
	yarn run seed

# DEVELOPMENT
hosts-image-dev:
	cd apis/hosts-api && go build -o hosts-api .
	cd apis/hosts-api && docker build -f Dockerfile.dev -t hosts-api .

properties-image-dev:
	cd apis/properties-api && go build -o properties-api .
	cd apis/properties-api && docker build -f Dockerfile.dev -t properties-api .

build-dev: webpack hosts-image-dev properties-image-dev static-files-image get-data-image

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

build-prod: webpack hosts-image-prod properties-image-prod static-files-image get-data-image

docker-push: webpack
	cd static-server && \
	docker buildx build --platform linux/arm,linux/amd64,linux/arm64 -t manedurphy/static-files:$(VERSION) -f Dockerfile.prod . --push

	cd apis/properties-api && \
	docker buildx build --platform linux/arm,linux/arm64,linux/amd64 -t manedurphy/properties-api:$(VERSION) -f Dockerfile.prod . --push

	cd apis/hosts-api && \
	docker buildx build --platform linux/arm,linux/arm64,linux/amd64 -t manedurphy/hosts-api:$(VERSION) -f Dockerfile.prod . --push

	cd apis/get-data-api && \
	docker buildx build --platform linux/arm,linux/arm64,linux/amd64 -t manedurphy/get-data-api:$(VERSION) -f Dockerfile . --push

terraform-apply:
	terraform apply --auto-approve -var-file="secret.tfvars"

terraform-destroy:
	terraform destroy --auto-approve -var-file="secret.tfvars"