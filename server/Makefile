
DOCKER_IMAGE:=express_test_simple

## Container
build:
	docker build --tag ${DOCKER_IMAGE} .
run:
	docker run --rm -it --publish 8000:8000 ${DOCKER_IMAGE}

## Local
local_install:
	npm install express
local_run:
	node app.js
