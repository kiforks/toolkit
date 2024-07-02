import { Directive, inject, input } from '@angular/core';
import { Breakpoint } from '@kiforks/core';

import { MediaService } from '../../services';

import { MediaBaseDirective } from '../media-base/media-base.directive';

import { MediaElement } from '../../interfaces';

import { MEDIA_ELEMENT } from '../../tokens';

/**
 * The `MediaOnlyDirective` is designed to handle media queries that target specific breakpoints (e.g., `only`).
 * It uses the `MediaBaseDirective` as a host directive to leverage its logic for media query handling.
 *
 * Example usage in the DOM:
 * ```html
 * <div *ksMediaOnly="'md'">
 *   This content will only be displayed for the 'md' breakpoint.
 * </div>
 * ```
 *
 * This directive is identical to the "media-only" mixin you can see here:
 * @see libs/ui/scss/utilities/media/mixins/_media-only.scss
 */
@Directive({
	selector: '[ksMediaOnly]',
	standalone: true,
	providers: [{ provide: MEDIA_ELEMENT, useExisting: MediaOnlyDirective }],
	hostDirectives: [MediaBaseDirective],
})
export class MediaOnlyDirective implements MediaElement<Breakpoint> {
	public readonly breakpoint = input.required<Breakpoint>({ alias: 'ksMediaOnly' });

	// eslint-disable-next-line @typescript-eslint/unbound-method
	public readonly checkMedia = inject(MediaService).mediaOnly;
}
