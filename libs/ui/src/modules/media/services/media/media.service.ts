import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Bind, Breakpoint } from '@kiforks/utilities';
import { indexOf } from 'lodash';
import { map, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { MediaHelper } from '../../helpers';

import { MediaBetweenBreakpoints, MediaBreakpoint } from '../../interfaces';

import { MediaConfig } from '../../configs';

@Injectable({ providedIn: 'root' })
export class MediaService {
	public static readonly breakpointsKeys: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

	/*
	 * Browsers don’t currently support range context queries, so we work around the
	 * limitations of min- and max- prefixes and viewports with fractional widths
	 * (which can occur under certain conditions on high-dpi devices, for instance)
	 * by using values with higher precision.
	 */
	public static readonly maxScreenRange = 0.02;

	constructor(private readonly breakpointObserver: BreakpointObserver) {}

	/*
	 * Media of mobile screen maximum breakpoint width.
	 * No query for the largest breakpoint.
	 * Makes the content apply to the given breakpoint and narrower.
	 */
	public get mediaMobile(): Observable<boolean> {
		return this.mediaMax('md');
	}

	/*
	 * Media of desktop screen maximum breakpoint width.
	 * No query for the smallest breakpoint.
	 * Makes the content apply to the given breakpoint and wider.
	 */
	public get mediaDesktop(): Observable<boolean> {
		return this.mediaMin('md');
	}

	/*
	 * Media of at least the minimum breakpoint width.
	 * No query for the smallest breakpoint
	 * Is matched apply to the given breakpoint and wider.
	 */
	@Bind public mediaMin(breakpoint: MediaBreakpoint): Observable<boolean> {
		return this.getBreakpointValue(breakpoint, 'min');
	}

	/*
	 * Media of at most the maximum breakpoint width.
	 * No query for the largest breakpoint.
	 * Is matched apply to the given breakpoint and narrower.
	 */
	@Bind public mediaMax(breakpoint: MediaBreakpoint): Observable<boolean> {
		return this.getBreakpointValue(breakpoint);
	}

	/*
	 * Media that spans multiple breakpoint widths.
	 * Is matched apply between the min and max breakpoints.
	 */
	@Bind public mediaBetween([breakpointFrom, breakpointTo]: MediaBetweenBreakpoints): Observable<boolean> {
		const breakpointMin: number = MediaConfig.breakpoints[breakpointFrom];
		const breakpointMax: number = MediaConfig.breakpoints[breakpointTo];

		return this.getBreakpointsBetween(breakpointMin, breakpointMax);
	}

	/*
	 * Media between the breakpoints minimum and maximum widths.
	 * No minimum for the smallest breakpoint, and no maximum for the largest one.
	 * Is matched apply only to the given breakpoint, not viewports any wider or narrower.
	 */
	@Bind public mediaOnly(breakpoint: Breakpoint): Observable<boolean> {
		if (breakpoint === 'xs') {
			return this.getBreakpointValue('sm');
		}

		if (breakpoint === 'xxl') {
			return this.getBreakpointValue('xxl', 'min');
		}

		const { breakpointsKeys, maxScreenRange } = MediaService;

		const nextBreakpointIndex: number = indexOf(breakpointsKeys, breakpoint) + 1;
		const nextBreakpoint: Breakpoint = breakpointsKeys[nextBreakpointIndex];
		const breakpointMax: number = MediaConfig.breakpoints[nextBreakpoint] - maxScreenRange;
		const breakpointMin: number = MediaConfig.breakpoints[breakpoint];

		return this.getBreakpointsBetween(breakpointMin, breakpointMax);
	}

	private getBreakpointValue(breakpoint: MediaBreakpoint, width: 'max' | 'min' = 'max'): Observable<boolean> {
		const breakpointValue = MediaConfig.breakpoints[breakpoint];

		const breakpointMax = MediaHelper.getMaxWidth(breakpointValue - MediaService.maxScreenRange);
		const breakpointMin = MediaHelper.getMinWidth(breakpointValue);

		return this.observeBreakpoint(width === 'min' ? breakpointMin : breakpointMax);
	}

	private getBreakpointsBetween(breakpointMin: number, breakpointMax: number): Observable<boolean> {
		const breakpointMinValue = MediaHelper.getMinWidth(breakpointMin);
		const breakpointMaxValue = MediaHelper.getMaxWidth(breakpointMax);

		if (breakpointMin && !breakpointMax) {
			return this.observeBreakpoint(breakpointMinValue);
		}

		if (breakpointMax && !breakpointMin) {
			return this.observeBreakpoint(breakpointMaxValue);
		}

		return this.observeBreakpoint(`${breakpointMinValue} and ${breakpointMaxValue}`);
	}

	private observeBreakpoint(breakpoint: string): Observable<boolean> {
		return this.breakpointObserver.observe(breakpoint).pipe(
			map(value => value.matches),
			distinctUntilChanged()
		);
	}
}
