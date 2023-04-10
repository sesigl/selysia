.PHONY: install-deps tidy build lint clean test deploy deploy-nonprod deploy-prod generate-client generate-server generate

install-deps:
	go get ./...

tidy:
	go mod tidy

clean:
	rm -rf ./bin ./vendor Gopkg.lock

lint:
	golangci-lint run ./src/...

build: clean test
	env GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -ldflags="-s -w" -o bin/post_delete src/internal/interfaces/rest/post/method/delete/delete_controller.go
	env GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -ldflags="-s -w" -o bin/post_get src/internal/interfaces/rest/post/method/get/get_controller.go
	env GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -ldflags="-s -w" -o bin/post_post src/internal/interfaces/rest/post/method/post/post_controller.go
	env GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -ldflags="-s -w" -o bin/post_put src/internal/interfaces/rest/post/method/put/put_controller.go

	env GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -ldflags="-s -w" -o bin/ai_generateContent_post src/internal/interfaces/rest/ai/generate_content/post_controller.go

test:
	go test ./...

deploy-nonprod: build
	sls deploy --verbose

deploy-prod: build
	sls deploy --stage production --verbose

format:
	gofmt -w todos/get.go

generate-client:
	npx openapi-generator-cli generate -i openapi.yml -g typescript  -o ../frontend/src/client/post-store --additional-properties=supportsES6=true,withInterfaces=true && cd ../frontend/src/client/post-store && rm -rf package.json index.ts tsconfig.json *.md *.sh && cd -

generate-server:
	npx openapi-generator-cli generate -i openapi.yml -g go-server  -o ./src/server/ --additional-properties=onlyInterfaces=true,outputAsLibrary=true

generate: generate-client generate-server

migrate-nonprod:
	set -a; source .env; set +a && dotenv -- migrate -database ${COCKROACHDB_URL_MIGRATE} -path db/migrations up