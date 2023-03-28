# ts-waitgroup

[![Continuous Integration Status](https://github.com/tombenke/ts-waitgroup/workflows/Continuous%20Integration/badge.svg)](https://github.com/tombenke/ts-waitgroup)

A WaitGroup waits for a collection of async functions to finish.

This module simulates the working of the [`WaitGroup`](https://pkg.go.dev/sync#WaitGroup) type of the `sync` package of the [Go programming language](https://go.dev/).

The module implements a WaitGroup class, that waits for a collection of asynchronous function to finish.

The main function, that uses the `WaitGroup` initializes its counter or, calls the `add()` method to set the number of async functions to wait for.
Then each of the async functions runs and calls `done()` when finished. The `done()` function must be called as many times the counter was set to.
At the same time, `wait()` can be used to block until all async functions have finished.
The `done()` calls may have a `result: any` parameter.
In this case the parameter of the last `done()` call will be the return value of the `wait()` function.

If there is a problem, the `fail()` call will break the execution, so the `wait()` will return immediately with the optional `result: any` parameter that was given to the `fail()` call.

## Usage

```TypeScript
    // Start a wait-group with more than one items
    const wg = new WaitGroup(3);

    // Start async function-1
    setTimeout(() => {
        wg.done('OK');
    }, 10);

    // Start async function-2
    setTimeout(() => {
        wg.done('OK');
    }, 20);

    // Start async function-3
    setTimeout(() => {
        wg.done('OK');
    }, 30);

    // Wait for the completion of the async functions
    const result = await wg.wait();
    // result = 'OK'
```

See the [unit tests](src/waitGroup.test.ts) for more examples.

See also the [API docs](https://tombenke.github.io/ts-waitgroup/).

## Development

It uses the following tools:

- TypeScript
- ESLint
- Prettier
- Jest
- [Taskfile](https://taskfile.dev/)

### Build

To compile TypeScript code use the following command:

    task build

This will create a "dist" folder in which all the compiled JavaScript files appear.

### Run lint

This project uses ESLint with Prettier, Airbnb and recommended TypeScript configurations.
In order to start lint locally, use this command:

    task lint

### Test with coverage

Test files can be found beside the corresponding source files.
Every test file name must follow the "\*.test.ts" pattern.
To run these tests and generate coverage report, use this command:

    task test

The generated coverage report can be found under the "coverage" folder.

### Clean project

To remove the "build" and "coverage" folders you can run the clean command.

    task clean

## License
The code and documentation in this project are released under the [MIT License](LICENSE)

