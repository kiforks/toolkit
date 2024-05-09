import { inject, Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Breakpoint } from '@kiforks/core';
import { Bind } from '@kiforks/utilities';
import { indexOf } from 'lodash';
import { map, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { KS_MEDIA_CONFIG } from '../../configs/media/media.config';

import { MediaHelper } from '../../helpers';

import { KsMediaBetweenBreakpoints, KsMediaBreakpoint, KsMediaConfig } from '../../interfaces';

import { KS_MEDIA_CONFIG_TOKEN } from '../../tokens/media.token';

/**
 * Service for handling media-min queries via breakpoints.
 */
@Injectable({ providedIn: 'root' })
export class KsMediaService {
	private readonly breakpointObserver = inject(BreakpointObserver);
	private readonly config: KsMediaConfig = {
		breakpoints: KS_MEDIA_CONFIG.breakpoints,
		deviceBreakpoint: KS_MEDIA_CONFIG.deviceBreakpoint,
		...inject(KS_MEDIA_CONFIG_TOKEN, { optional: true }),
	};

	/**
	 * Media of mobile screen maximum breakpoint width.
	 * No query for the largest breakpoint.
	 * Makes the content apply to the given breakpoint and narrower.
	 */
	public get mediaMobile(): Observable<boolean> {
		return this.mediaMax(this.config.deviceBreakpoint);
	}

	/**
	 * Media of desktop screen maximum breakpoint width.
	 * No query for the smallest breakpoint.
	 * Makes the content apply to the given breakpoint and wider.
	 */
	public get mediaDesktop(): Observable<boolean> {
		return this.mediaMin(this.config.deviceBreakpoint);
	}

	/**
	 * Media of at least the minimum breakpoint width.
	 * No query for the smallest breakpoint
	 * Is matched apply to the given breakpoint and wider.
	 */
	@Bind public mediaMin(breakpoint: KsMediaBreakpoint): Observable<boolean> {
		return this.getBreakpointValue(breakpoint, 'min');
	}

	/**
	 * Media of at most the maximum breakpoint width.
	 * No query for the largest breakpoint.
	 * Is matched apply to the given breakpoint and narrower.
	 */
	@Bind public mediaMax(breakpoint: KsMediaBreakpoint): Observable<boolean> {
		return this.getBreakpointValue(breakpoint);
	}

	/**
	 * Media that spans multiple breakpoint widths.
	 * Is matched apply between the min and max breakpoints.
	 */
	@Bind public mediaBetween([breakpointFrom, breakpointTo]: KsMediaBetweenBreakpoints): Observable<boolean> {
		const breakpointMin = this.config.breakpoints[breakpointFrom];
		const breakpointMax = this.config.breakpoints[breakpointTo];

		return this.getBreakpointsBetween(breakpointMin, breakpointMax);
	}

	/**
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

		const nextBreakpointIndex = indexOf(KS_MEDIA_CONFIG.breakpointValues, breakpoint) + 1;
		const nextBreakpoint = KS_MEDIA_CONFIG.breakpointValues[nextBreakpointIndex];
		const breakpointMax = this.config.breakpoints[nextBreakpoint];
		const breakpointMin = this.config.breakpoints[breakpoint];

		return this.getBreakpointsBetween(breakpointMin, breakpointMax);
	}

	private getBreakpointValue(breakpoint: KsMediaBreakpoint, width: 'max' | 'min' = 'max'): Observable<boolean> {
		const breakpointValue = this.config.breakpoints[breakpoint];

		const breakpointMax = MediaHelper.getMaxWidth(breakpointValue);
		const breakpointMin = MediaHelper.getMinWidth(breakpointValue);

		return this.observeBreakpoint(width === 'min' ? breakpointMin : breakpointMax);
	}

	private getBreakpointsBetween(breakpointMin: number, breakpointMax: number): Observable<boolean> {
		const breakpointMinValue = MediaHelper.getMinWidth(breakpointMin);
		const breakpointMaxValue = MediaHelper.getMaxWidth(breakpointMax);

		if (breakpointMin >= breakpointMax) {
			throw new Error(
				`"KsMediaService": the minimum value "${breakpointMinValue}" cannot be equal to or greater than the maximum value "${breakpointMaxValue}"`
			);
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
