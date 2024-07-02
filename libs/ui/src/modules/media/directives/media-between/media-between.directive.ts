import { Directive, inject, input } from '@angular/core';

import { MediaService } from '../../services';

import { MediaBaseDirective } from '../media-base/media-base.directive';

import { MediaBetweenBreakpoints, MediaElement } from '../../interfaces';

import { MEDIA_ELEMENT } from '../../tokens';

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
