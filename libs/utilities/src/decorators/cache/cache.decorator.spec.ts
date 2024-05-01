import { Cache } from './cache.decorator';

class A {
	public singleCount = 0;
	public multipleCount = 0;

	@Cache public single(params: object): number {
		console.warn(params); // just for testing purpose

		this.singleCount++;

		return this.singleCount;
	}

	@Cache public multiple(param1: string, param2: object): number {
		console.warn(param1, param2); // just for testing purpose

		this.multipleCount++;

		return this.multipleCount;
	}
}

const a = new A();

describe('CacheDecorator', () => {
	it('should call method only when 1 params change', () => {
		const logSpy = jest.spyOn(console, 'warn');

		const res1 = a.single({ some: 1 });

		expect(res1).toEqual(1);
		expect(logSpy).toHaveBeenNthCalledWith(1, { some: 1 });

		logSpy.mockClear();

		const res2 = a.single({ some: 1 });

		expect(res2).toEqual(1);
		expect(logSpy).not.toHaveBeenCalled();

		logSpy.mockClear();

		const res3 = a.single({ some: 2 });

		expect(res3).toEqual(2);
		expect(logSpy).toHaveBeenNthCalledWith(1, { some: 2 });
	});

	it('should call method only when multiple params change', () => {
		const logSpy = jest.spyOn(console, 'warn');

		const res1 = a.multiple('some', { some: 1 });

		expect(res1).toEqual(1);
		expect(logSpy).toHaveBeenCalledWith('some', { some: 1 });

		logSpy.mockReset();

		const res2 = a.multiple('some', { some: 1 });

		expect(res2).toEqual(1);
		expect(logSpy).not.toHaveBeenCalled();

		logSpy.mockReset();

		const res3 = a.multiple('111', { some: 2 });

		expect(res3).toEqual(2);
		expect(logSpy).toHaveBeenNthCalledWith(1, '111', { some: 2 });

		logSpy.mockReset();

		const res4 = a.multiple('111', { some: 3 });

		expect(res4).toEqual(3);

		expect(logSpy).toHaveBeenNthCalledWith(1, '111', { some: 3 });

		logSpy.mockReset();

		const res5 = a.multiple('some', { some: 1 });

		expect(res5).toEqual(1);
		expect(logSpy).not.toHaveBeenCalled();
	});
});
