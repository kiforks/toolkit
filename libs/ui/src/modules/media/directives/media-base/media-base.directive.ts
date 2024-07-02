import { Directive, inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, switchMap, tap } from 'rxjs';

import { MEDIA_ELEMENT } from '../../tokens';

/**
 * The `MediaBaseDirective` is designed to manage the display of elements based on media queries (like screen size breakpoints).
 * This directive listens to breakpoint changes and conditionally displays or hides elements based on whether the media query matches.
 *
 * Example of using `MediaBaseDirective` as a host directive in combination with the token and interface it implements.
 * ```typescript
 * @Directive({
 *     selector: '[someDirective]',
 *     standalone: true,
 *     providers: [{ provide: MEDIA_ELEMENT, useExisting: MediaMaxDirective }],
 *     hostDirectives: [MediaBaseDirective],
 * })
 * export class MediaMaxDirective implements MediaElement {
 *     // Defines the breakpoint input for the directive.
 *     public readonly breakpoint = input.required<MediaBreakpoint>();
 *
 *     // Injects the MediaService to use its 'mediaMax' method for checking media queries.
 *     public readonly checkMedia = inject(MediaService).mediaMax;
 * }
 * ```
 */
@Directive({
	selector: '[ksMediaBase]',
	standalone: true,
})
export class MediaBaseDirective {
	private readonly templateRef = inject(TemplateRef<null>);
	private readonly viewContainerRef = inject(ViewContainerRef);
	private readonly mediaElement = inject(MEDIA_ELEMENT);

	private readonly breakpoint$ = toObservable(this.mediaElement.breakpoint);

	constructor() {
		this.breakpoint$
			.pipe(
				// Clears the view container before processing a new breakpoint.
				tap(() => this.viewContainerRef.clear()),
				// Each time the breakpoint is changed, it destroys the old subscription and works only with the new value.
				switchMap(breakpoint => this.mediaElement.checkMedia(breakpoint)),
				// Prevents double rendering of the template
				distinctUntilChanged(),
				takeUntilDestroyed()
			)
			.subscribe(isMatched =>
				isMatched ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear()
			);
	}
}
