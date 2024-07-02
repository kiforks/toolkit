import { Directive, inject, input } from '@angular/core';

import { MediaService } from '../../services';

import { MediaBaseDirective } from '../media-base/media-base.directive';

import { MediaBreakpoint, MediaElement } from '../../interfaces';

import { MEDIA_ELEMENT } from '../../tokens';

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
