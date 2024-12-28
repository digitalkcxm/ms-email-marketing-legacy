start-services:
	- ./docker/scripts/init.sh
stop-services:
	- docker compose down
build:
	- docker build -f ./Dockerfile-prod -t ms-email-marketing-legacy-container:latest .
start:
	- docker run --name ms-email-marketing-legacy-container -p 5014:80 -d ms-email-marketing-legacy-container:latest
exec:
	- docker exec -it ms-email-marketing-legacy-container /bin/sh
logs:
	- docker logs -f --tail 50 --timestamps ms-email-marketing-legacy-container
