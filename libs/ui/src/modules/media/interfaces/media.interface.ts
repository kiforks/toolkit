import { Breakpoint } from '@kiforks/utilities';
import { Observable } from 'rxjs';

/*
 * For min-width no media query necessary for xs breakpoint as it's effectively `@media (min-width: 0) { ... }`
 * For max-width no media query necessary for xs breakpoint as it's effectively `@media (max-width: 0) { ... }`
 * This is the reason why we exclude 'xs' breakpoint from this type
 * */
export type MediaBreakpoint = Exclude<Breakpoint, 'xs'>;
export type MediaBetweenBreakpoints = [Breakpoint, MediaBreakpoint];

export interface MediaDataContext {
	mediaDesktop: Observable<boolean>;
	mediaMobile: Observable<boolean>;

	mediaBetween([breakpointFrom, breakpointTo]: MediaBetweenBreakpoints): Observable<boolean>;
	mediaMax(breakpoint: MediaBreakpoint): Observable<boolean>;
	mediaMin(breakpoint: MediaBreakpoint): Observable<boolean>;
	mediaOnly(breakpoint: Breakpoint): Observable<boolean>;
}
