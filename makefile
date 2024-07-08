SCHEMA_DIR = packages/api/
API_DIR = packages/api
CLIENT_DIR = packages/client 

.PHONY: all
all: dev

.PHONY : dev
dev :
	cd $(API_DIR) && yarn start:dev

.PHONY : migrate
migrate:
	cd $(SCHEMA_DIR) &&  npx ts-node ./src/migrate.ts

.PHONY : migrate-down
migrate-down : 
	cd $(SCHEMA_DIR) && npx ts-node ./src/migrate-down.ts

haraka-install:
	haraka -i ./haraka
