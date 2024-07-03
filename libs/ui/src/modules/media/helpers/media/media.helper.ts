import { coerceCssPixelValue } from '@angular/cdk/coercion';

import { MediaConfig } from '../../configs/media/media.config';

/**
 * Helper class for generating media-min query strings.
 */
export abstract class MediaHelper {
	/**
	 * Returns a media-min query string for maximum width
	 * @param breakpoint The breakpoint value in pixels.
	 * @returns A media-min query string.
	 * @example
	 * ```typescript
	 * MediaHelper.getMaxWidth(768); // Returns "(max-width: 768px)"
	 * ```
	 */
	public static getMaxWidth(breakpoint: number): string {
		const value = breakpoint - MediaConfig.maxScreenRange;

		return `(max-width: ${coerceCssPixelValue(value)})`;
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
		return `(min-width: ${coerceCssPixelValue(breakpoint)})`;
	}
}
