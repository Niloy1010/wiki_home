# Getting Started with Backed of wiki app

Run the backend to see the api work in action

## Available Scripts

In the project directory, you can run:

### `go run main.go`

This will start the backend server

Your server is ready. Go to
[http://localhost:9090](http://localhost:9090) to see it in action

### `go test`

Launches the test runner in the interactive watch mode.

## Test commands

1. curl http://localhost:9090/articles/ -- Check all the articles present in the server \
2. curl ‘http://localhost:9090/articles/rest api’ -- Check a particular Article \
3. curl -X PUT http://localhost:9090/articles/wiki -d ‘A wiki is a knowledge base website’ -- Edit/Create an article \
