make startServer:
	npx start-server

make build:
	npm run build

make start:
	npm run start

make install:
	npm install
	cd frontend && npm install

make deployment:
	make install
	make build