/**
 * A WaitGroup waits for a collection of async functions to finish.
 *
 * This module simulates the working of the [`WaitGroup`](https://pkg.go.dev/sync#WaitGroup) type of
 * the `sync` package of the [Go programming language](https://go.dev/).
 *
 * The module implements a WaitGroup class, that waits for a collection of asynchronous function to finish.
 *
 * The main function, that uses the `WaitGroup` initializes its counter or, calls the `add()` method
 * to set the number of async functions to wait for.
 * Then each of the async functions runs and calls `done()` when finished.
 * The `done()` function must be called as many times the counter was set to.
 * At the same time, `wait()` can be used to block until all async functions have finished.
 * The `done()` calls may have a `result: any` parameter.
 * In this case the parameter of the last `done()` call will be the return value of the `wait()` function.
 *
 * If there is a problem, the `fail()` call will break the execution,
 * so the `wait()` will return immediately with the optional `result: any` parameter that was given to the `fail()` call.
 *
 */
export class WaitGroup {
    /** The number of items in the group to wait for */
    private count: number;

    /** The internal promise of the wait group */
    private promise: Promise<any>;

    /** The resolve function of the internal promise of the wait group */
    private resolve: any;

    /** The reject function of the internal promise of the wait group */
    private reject: any;

    /** The constructor */
    constructor(
        /** The initial value of the counter. The default value is 1. */
        count?: number,
    ) {
        this.count = 1;
        if (count) {
            this.count = count;
        }

        this.promise = new Promise((resolve, reject) => {
            this.reject = reject;
            this.resolve = resolve;
        });
    }

    /** Add adds delta, which may be negative, to the WaitGroup counter.
     * If the counter becomes zero or negative, all the `wait()` will be released.
     * For such cases a `result` value will be used similar to the `done()` function call.
     */
    add(
        /** The delta value to increase, or decrease the counter of the `WaitGroup` */
        count: number,
        /** The result the `wait()` may return in case the count become 0 or less than zero */
        result?: any,
    ) {
        this.count += count;
        if (this.count <= 0) {
            this.resolve(result);
        }
    }

    /** Done one item that the group is waiting for */
    done(
        /** The result the `wait()` may return in case the count become 0 or less than zero */
        result?: any,
    ) {
        this.count -= 1;
        if (this.count <= 0) {
            this.resolve(result);
        }
    }

    /** Fail the waiting process */
    fail(
        /** The result the `wait()` will return with. */
        result?: any,
    ) {
        this.reject(result);
    }

    /** Wait for the results and return with it */
    wait(): Promise<any> {
        return this.promise
            .then((result) => {
                return result;
            })
            .catch((result) => {
                return result;
            });
    }
}
