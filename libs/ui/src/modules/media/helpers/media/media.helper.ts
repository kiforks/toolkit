export abstract class MediaHelper {
	public static getMaxWidth(breakpoint: number): string {
		return `(max-width: ${breakpoint}px)`;
	}

	public static getMinWidth(breakpoint: number): string {
		return `(min-width: ${breakpoint}px)`;
	}
}
