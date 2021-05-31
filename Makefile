photo-header-image:
	cd Dane-Service-Header && docker build -t photo-header-service .

hosted-by-image:
	cd Dane-Service-HostedBy && docker build -t hosted-by-service .

airbnb-client-image:
	docker build -t airbnb-client-service -f ./Dockerfile .

proxy-image:
	cd Dane-Proxy && docker build -t proxy-service .

build: photo-header-image hosted-by-image airbnb-client-image proxy-image

docker-push: build
	docker tag photo-header-service manedurphy/photo-header-service
	docker push manedurphy/photo-header-service

	docker tag hosted-by-service manedurphy/hosted-by-service
	docker push manedurphy/hosted-by-service

	docker tag airbnb-client-service manedurphy/airbnb-client-service
	docker push manedurphy/airbnb-client-service

	docker tag proxy-service manedurphy/proxy-service
	docker push manedurphy/proxy-service