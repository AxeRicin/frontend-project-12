make startServer:
	npx start-server

make build:
	npm run build

make start:
	npm run start

make install:
	npm ci
	cd frontend && npm ci

make deployment:
	make install
	make build
	make start