import { Directive, inject, input } from '@angular/core';

import { MediaService } from '../../services';

import { MediaBaseDirective } from '../media-base/media-base.directive';

import { MediaBetweenBreakpoints, MediaElement } from '../../interfaces';

import { MEDIA_ELEMENT } from '../../tokens';

/**
 * The `MediaBetweenDirective` is designed to handle media queries that target a range between two breakpoints.
 * It uses the `MediaBaseDirective` as a host directive to leverage its logic for media query handling.
 *
 * Example usage in the DOM:
 * ```html
 * <div *ksMediaBetween="['md', 'lg']">
 *   This content will only be displayed for screen sizes between the 'md' and 'lg' breakpoints.
 * </div>
 * ```
 *
 * This directive is identical to the "media-between" mixin you can see here:
 * @see libs/ui/scss/utilities/media/mixins/_media-between.scss
 */
@Directive({
	selector: '[ksMediaBetween]',
	standalone: true,
	providers: [{ provide: MEDIA_ELEMENT, useExisting: MediaBetweenDirective }],
	hostDirectives: [MediaBaseDirective],
})
export class MediaBetweenDirective implements MediaElement<MediaBetweenBreakpoints> {
	public readonly breakpoint = input.required<MediaBetweenBreakpoints>({ alias: 'ksMediaBetween' });

	// eslint-disable-next-line @typescript-eslint/unbound-method
	public readonly checkMedia = inject(MediaService).mediaBetween;
}
