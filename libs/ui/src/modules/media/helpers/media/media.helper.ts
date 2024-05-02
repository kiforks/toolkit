import { KS_MEDIA_CONFIG } from '../../configs/media/media.config';

/**
 * Helper class for generating media-min query strings.
 */
export abstract class MediaHelper {
	/**
	 * Returns a media-min query string for maximum width.
	 * @param breakpoint The breakpoint value in pixels.
	 * @returns A media-min query string.
	 * @example
	 * ```typescript
	 * MediaHelper.getMaxWidth(768); // Returns "(max-width: 768px)"
	 * ```
	 */
	public static getMaxWidth(breakpoint: number): string {
		const value = breakpoint - KS_MEDIA_CONFIG.maxScreenRange;

		return `(max-width: ${value}px)`;
	}

	/**
	 * Returns a media-min query string for minimum width.
	 * @param breakpoint The breakpoint value in pixels.
	 * @returns A media-min query string.
	 * @example
	 * ```typescript
	 * MediaHelper.getMinWidth(768); // Returns "(min-width: 768px)"
	 * ```
	 */
	public static getMinWidth(breakpoint: number): string {
		return `(min-width: ${breakpoint}px)`;
	}
}
