import { InputSignal } from '@angular/core';
import { Breakpoint } from '@kiforks/core';
import { Observable } from 'rxjs';

/*
 * For min-width no media-min query necessary for xs breakpoint as it's effectively `@media-min (min-width: 0) { ... }`
 * For max-width no media-min query necessary for xs breakpoint as it's effectively `@media-min (max-width: 0) { ... }`
 * This is the reason why we exclude 'xs' breakpoint from this type
 * */
export type MediaBreakpoint = Exclude<Breakpoint, 'xs'>;
export type MediaBetweenBreakpoints = [Breakpoint, MediaBreakpoint];

export type MediaBreakpoints = Record<Breakpoint, number>;

export interface MediaConfig {
	breakpoints: MediaBreakpoints;
	deviceBreakpoint: MediaBreakpoint;
}

export interface MediaElement<B = MediaBreakpoint> {
	readonly breakpoint: InputSignal<B>;

	readonly checkMedia: (breakpoint: B) => Observable<boolean>;
}

export interface MediaDevice {
	get checkMedia(): Observable<boolean>;
}
