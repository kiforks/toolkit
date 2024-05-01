import { Bind } from './bind.decorator';

describe('@Bind decorator', () => {
	describe('valid', () => {
		class TestClass {
			public message = 'Hello';

			@Bind public getMessage(): string {
				return this.message;
			}
		}

		const instance = new TestClass();

		it('should bind method to the class instance', () => {
			// eslint-disable-next-line @typescript-eslint/unbound-method
			const method = instance.getMessage;

			expect(method()).toBe('Hello');
		});

		it('should bind the method only once', () => {
			// eslint-disable-next-line @typescript-eslint/unbound-method
			const method1 = instance.getMessage;
			// eslint-disable-next-line @typescript-eslint/unbound-method
			const method2 = instance.getMessage;

			expect(method1).toBe(method2);
		});
	});
});
