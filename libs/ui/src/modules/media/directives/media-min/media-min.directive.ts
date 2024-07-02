import { Directive, inject, input } from '@angular/core';

import { MediaService } from '../../services';

import { MediaBaseDirective } from '../media-base/media-base.directive';

import { MediaBreakpoint, MediaElement } from '../../interfaces';

import { MEDIA_ELEMENT } from '../../tokens';

/**
 * The `MediaMinDirective` is designed to handle `min-width` media queries.
 * It uses the `MediaBaseDirective` as a host directive to leverage its logic for media query handling.
 *
 * Example usage in the DOM:
 * ```html
 * <div *ksMediaMin="'md'">
 *   This content will only be displayed for screen sizes from the 'md' breakpoint and up.
 * </div>
 * ```
 *
 * This directive is identical to the "media-min" mixin you can see here:
 * @see libs/ui/scss/utilities/media/mixins/_media-min.scss
 */
@Directive({
	selector: '[ksMediaMin]',
	standalone: true,
	providers: [{ provide: MEDIA_ELEMENT, useExisting: MediaMinDirective }],
	hostDirectives: [MediaBaseDirective],
})
export class MediaMinDirective implements MediaElement {
	public readonly breakpoint = input.required<MediaBreakpoint>({ alias: 'ksMediaMin' });

	// eslint-disable-next-line @typescript-eslint/unbound-method
	public readonly checkMedia = inject(MediaService).mediaMin;
}
