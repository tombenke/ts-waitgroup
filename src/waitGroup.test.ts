import { WaitGroup } from './waitGroup';

describe('Messenger', () => {
    it('single-OK', async () => {
        // Start a wait-group with a single item by default
        const wg = new WaitGroup();

        // Complete one item
        wg.done('OK');

        // Wait for the completion of the group
        const result = await wg.wait();
        expect(result).toEqual('OK');
    });

    it('single-OK, done is undefined', async () => {
        // Start a wait-group with a single item by default
        const wg = new WaitGroup();

        // Complete one item
        wg.done();

        // Wait for the completion of the group
        const result = await wg.wait();
        expect(result).toBeUndefined();
    });

    it('add-OK', async () => {
        // Start a wait-group with a single item by default
        const wg = new WaitGroup();

        // Add two items to the group
        wg.add(2);

        // Complete the items
        wg.done('OK');
        wg.done('OK');
        wg.done('OK');

        // Wait for the completion of the group
        const result = await wg.wait();
        expect(result).toEqual('OK');
    });

    it('add-negative-OK', async () => {
        // Start a wait-group with 3 items
        const wg = new WaitGroup(3);

        // Complete 1 item with done
        wg.done('OK');
        // Complete all others left with negative `add()` value
        wg.add(-2, 'OK');

        // Wait for the completion of the group
        const result = await wg.wait();
        expect(result).toEqual('OK');
    });

    it('many-OK', async () => {
        // Start a wait-group with more than one items
        const wg = new WaitGroup(3);

        // Complete the items
        wg.done('OK');
        wg.done('OK');
        wg.done('OK');

        // Wait for the completion of the group
        const result = await wg.wait();
        expect(result).toEqual('OK');
    });

    it('single-fail', async () => {
        // Start a wait-group with a single item by default
        const wg = new WaitGroup();
        wg.fail('FAILED');

        // Wait for the completion of the group
        const result = await wg.wait();
        expect(result).toEqual('FAILED');
    });

    it('single-fail, done is undefined', async () => {
        // Start a wait-group with a single item by default
        const wg = new WaitGroup();
        wg.fail();

        // Wait for the completion of the group
        const result = await wg.wait();
        expect(result).toBeUndefined();
    });

    it('many-fail', async () => {
        // Start a wait-group with more than one items
        const wg = new WaitGroup(3);

        // Complete the items
        wg.done('OK');
        wg.done('OK');
        wg.fail('FAILED');

        // Wait for the completion of the group
        const result = await wg.wait();
        expect(result).toEqual('FAILED');
    });

    it('single-async-OK', async () => {
        // Start a wait-group with a single item by default
        const wg = new WaitGroup();

        // Start an async function
        setTimeout(() => {
            wg.done('OK');
        }, 50);

        // Wait for the completion of the async function
        const result = await wg.wait();
        expect(result).toEqual('OK');
    });

    it('many-async OK', async () => {
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
        expect(result).toEqual('OK');
    });

    it('many-mixed OK', async () => {
        // Start a wait-group with more than one items
        const wg = new WaitGroup(5);

        // Start async function-1
        setTimeout(() => {
            wg.done('OK');
        }, 10);

        // Start async function-2
        setTimeout(() => {
            wg.done('OK');
        }, 20);

        wg.done('OK');

        // Start async function-3
        setTimeout(() => {
            wg.done('OK');
        }, 30);

        wg.done('OK');

        // Wait for the completion of the async functions
        const result = await wg.wait();
        expect(result).toEqual('OK');
    });

    it('many-async fail', async () => {
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
            wg.fail('FAILED');
        }, 30);

        // Wait for the completion of the async functions
        const result = await wg.wait();
        expect(result).toEqual('FAILED');
    });
});
