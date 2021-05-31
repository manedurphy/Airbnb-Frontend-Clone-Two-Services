photo-header-image:
	cd Dane-Service-Header && docker build -t photo-header-service .

hosted-by-image:
	cd Dane-Service-HostedBy && docker build -t hosted-by-service .

airbnb-client-image:
	docker build -t airbnb-client-service -f ./Dockerfile .

proxy-image:
	cd Dane-Proxy && docker build -t proxy-service -f Dockerfile.prod .

build: photo-header-image hosted-by-image proxy-image

docker-push: build
	docker tag photo-header-service manedurphy/photo-header-service
	docker push manedurphy/photo-header-service

	docker tag hosted-by-service manedurphy/hosted-by-service
	docker push manedurphy/hosted-by-service

	docker tag proxy-service manedurphy/proxy-service
	docker push manedurphy/proxy-service

cluster:
	kind create cluster --config=kind.yaml

ingress-controller:
	kubectl create namespace ingress-nginx
	helm install --namespace=ingress-nginx ingress-nginx ingress-nginx/ingress-nginx
	kubectl wait --namespace=ingress-nginx --for=condition=Ready --timeout=5m pod -l app.kubernetes.io/name=ingress-nginx

deploy:
	kubectl --namespace=default apply -f k8s

destroy:
	kubectl --namespace=default delete -f k8s

forward:
	kubectl config set-context --current --namespace=ingress-nginx
	kubectl port-forward service/ingress-nginx-controller 5000:80

eks:
	eksctl create cluster --config-file eksctl.yaml

eks-destroy:
	eksctl delete cluster --config-file eksctl.yaml