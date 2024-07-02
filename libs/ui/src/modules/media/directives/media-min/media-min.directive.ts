import { Directive, inject, input } from '@angular/core';

import { MediaService } from '../../services';

import { MediaBaseDirective } from '../media-base/media-base.directive';

import { MediaBreakpoint, MediaElement } from '../../interfaces';

import { MEDIA_ELEMENT } from '../../tokens';

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
