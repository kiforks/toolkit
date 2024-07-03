/**
 * Decorator for automatically binding class methods to their instance.
 * @param _target The class constructor or prototype.
 * @param propertyKey The name of the property being decorated.
 * @param descriptor The property descriptor for the decorated property.
 * @returns The updated property descriptor or void.
 *
 * Example:
 * ```typescript
 * class ExampleClass {
 *   @Bind public method(): void {
 *     console.log(this instanceof Example); // true
 *   }
 * }
 *
 * const instance = new ExampleClass();
 * const boundMethod = instance.method;
 * boundMethod(); // logs: true
 *
 * Source:
 * @see https://github.com/NoHomey/bind-decorator
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function Bind<T extends Function>(
	_target: unknown,
	propertyKey: string,
	descriptor: TypedPropertyDescriptor<T>
): TypedPropertyDescriptor<T> | void {
	if (!descriptor || typeof descriptor.value !== 'function') {
		throw new TypeError(`Only methods can be decorated with @bind. <${propertyKey}> is not a method!`);
	}

	return {
		configurable: true,
		get(this: T): T {
			const bound: T = descriptor.value?.bind(this);

			Object.defineProperty(this, propertyKey, {
				value: bound,
				configurable: true,
				writable: true,
			});

			return bound;
		},
	};
}
