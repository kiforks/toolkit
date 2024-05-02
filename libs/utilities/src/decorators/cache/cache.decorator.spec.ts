import { Cache } from './cache.decorator';

describe('Cache decorator', () => {
	class Example {
		@Cache public method(arg1: number, arg2: string): number {
			return arg1 + parseInt(arg2);
		}
	}

	let instance: Example;

	beforeEach(() => {
		instance = new Example();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('caches the result', () => {
		const result1 = instance.method(2, '3');
		const result2 = instance.method(2, '3');

		expect(result1).toEqual(5);
		expect(result2).toEqual(5);
	});

	it('caches the result with different arguments', () => {
		const result1 = instance.method(2, '3');
		const result2 = instance.method(3, '4');

		expect(result1).toEqual(5);
		expect(result2).toEqual(7);
	});

	it('works with different instances', () => {
		const instance2 = new Example();
		const result1 = instance.method(2, '3');
		const result2 = instance2.method(2, '3');

		expect(result1).toEqual(5);
		expect(result2).toEqual(5);
	});

	it('does not have otherMethod', () => {
		const instanceKeys = Object.keys(instance);

		expect(instanceKeys).not.toContain('otherMethod');
	});
});
