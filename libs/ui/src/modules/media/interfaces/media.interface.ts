import { Breakpoint } from '@kiforks/core';

/*
 * For min-width no media-min query necessary for xs breakpoint as it's effectively `@media-min (min-width: 0) { ... }`
 * For max-width no media-min query necessary for xs breakpoint as it's effectively `@media-min (max-width: 0) { ... }`
 * This is the reason why we exclude 'xs' breakpoint from this type
 * */
export type KsMediaBreakpoint = Exclude<Breakpoint, 'xs'>;
export type KsMediaBetweenBreakpoints = [Breakpoint, KsMediaBreakpoint];

export type MediaBreakpoints = Record<Breakpoint, number>;

export interface KsMediaConfig {
	breakpoints: MediaBreakpoints;
	deviceBreakpoint: KsMediaBreakpoint;
}
