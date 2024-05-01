/**
 * Decorator for caching the result of a method based on its arguments.
 * @param _target The class constructor or prototype.
 * @param propertyKey The name of the property being decorated.
 * @param descriptor The property descriptor for the decorated property.
 * @returns The updated property descriptor or void.
 * @example
 * class Example {
 *   @Cache
 *   method(arg1: number, arg2: string): number {
 *     console.log('Calculating...');
 *     return arg1 + parseInt(arg2, 10);
 *   }
 * }
 *
 * const instance = new Example();
 * instance.method(2, '3'); // Logs: "Calculating..."
 * instance.method(2, '3'); // Result is cached, no logging
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function Cache<T extends Function>(
	_target: unknown,
	propertyKey: string,
	descriptor: TypedPropertyDescriptor<T>
): TypedPropertyDescriptor<T> | void {
	if (!descriptor || typeof descriptor.value !== 'function') {
		throw new TypeError(`Only methods can be decorated with @Cache. <${propertyKey}> is not a method!`);
	}

	const cache: Record<string, unknown> = {};

	function cachedFn(...args: unknown[]): any {
		const key = JSON.stringify(args);

		if (cache[key] !== undefined) {
			return cache[key];
		}

		// @ts-ignore TS doesn't recognize that decorators have "this" context
		const result = descriptor.value?.apply(this, args);

		cache[key] = result;

		return result;
	}

	return {
		configurable: true,
		value: cachedFn as unknown as T,
	};
}
