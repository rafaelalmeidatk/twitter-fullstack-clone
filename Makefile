reset-db:
	docker-compose run --rm api /bin/sh -c "cd packages/server && yarn reset-db"

dev:
	docker-compose up