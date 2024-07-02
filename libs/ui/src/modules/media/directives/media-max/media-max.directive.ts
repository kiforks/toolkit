import { Directive, inject, input } from '@angular/core';

import { MediaService } from '../../services';

import { MediaBaseDirective } from '../media-base/media-base.directive';

import { MediaBreakpoint, MediaElement } from '../../interfaces';

import { MEDIA_ELEMENT } from '../../tokens';

/**
 * The `MediaMaxDirective` is designed to handle `max-width` media queries.
 * It uses the `MediaBaseDirective` as a host directive to leverage its logic for media query handling.
 *
 * Example usage in the DOM:
 * ```html
 * <div *ksMediaMax="'lg'">
 *   This content will only be displayed for screen sizes up to the 'lg' breakpoint.
 * </div>
 * ```
 *
 * This directive is identical to the "media-min" mixin you can see here::
 * @see libs/ui/scss/utilities/media/mixins/_media-max.scss
 */
@Directive({
	selector: '[ksMediaMax]',
	standalone: true,
	providers: [{ provide: MEDIA_ELEMENT, useExisting: MediaMaxDirective }],
	hostDirectives: [MediaBaseDirective],
})
export class MediaMaxDirective implements MediaElement {
	public readonly breakpoint = input.required<MediaBreakpoint>({ alias: 'ksMediaMax' });

	// eslint-disable-next-line @typescript-eslint/unbound-method
	public readonly checkMedia = inject(MediaService).mediaMax;
}
