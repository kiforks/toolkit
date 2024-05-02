import { Breakpoint } from '@kiforks/utilities';

import { KsMediaBreakpoint, MediaBreakpoints } from '../../interfaces';

/**
 * @private
 *
 * This config is not a part of package
 * */
export abstract class KS_MEDIA_CONFIG {
	public static readonly breakpointValues: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
	public static readonly deviceBreakpoint: KsMediaBreakpoint = 'md';

	/*
	 * Browsers don’t currently support range context queries, so we work around the
	 * limitations of min- and max- prefixes and viewports with fractional widths
	 * (which can occur under certain conditions on high-dpi devices, for instance)
	 * by using values with higher precision.
	 */
	public static readonly maxScreenRange = 0.02;
	/**
	 * Breakpoints were taken from:
	 * @see https://getbootstrap.com/docs/5.0/layout/breakpoints/
	 * */
	public static readonly breakpoints: MediaBreakpoints = {
		/**
		 * Large breakpoint (≥992px).
		 */
		lg: 992,

		/**
		 * Medium breakpoint (≥768px).
		 */
		md: 768,

		/**
		 * Small breakpoint (≥576px).
		 */
		sm: 576,

		/**
		 * Extra-large breakpoint (≥1200px).
		 */
		xl: 1200,

		/**
		 * Extra-small breakpoint (<576px).
		 */
		xs: 0,

		/**
		 * Extra-extra-large breakpoint (≥1400px).
		 */
		xxl: 1400,
	};
}
