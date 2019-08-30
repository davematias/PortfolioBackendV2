.PHONY: build clean deploy

build:
	dep ensure -v
	set GOOS=linux go build -ldflags="-s -w" -o bin/hello hello/main.go
	set GOOS=linux go build -ldflags="-s -w" -o bin/world world/main.go

clean:
	rm -rf ./bin ./vendor Gopkg.lock

deploy: clean build
	sls deploy --verbose
