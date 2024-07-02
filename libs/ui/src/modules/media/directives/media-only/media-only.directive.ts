import { Directive, inject, input } from '@angular/core';
import { Breakpoint } from '@kiforks/core';

import { MediaService } from '../../services';

import { MediaBaseDirective } from '../media-base/media-base.directive';

import { MediaElement } from '../../interfaces';

import { MEDIA_ELEMENT } from '../../tokens';

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
