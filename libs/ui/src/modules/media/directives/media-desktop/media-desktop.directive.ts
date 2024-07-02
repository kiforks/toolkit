import { Directive, inject } from '@angular/core';

import { MediaService } from '../../services';

import { MediaDeviceDirective } from '../media-device/media-device.directive';

import { MediaDevice } from '../../interfaces';

import { MEDIA_DEVICE } from '../../tokens/media.token';

@Directive({
	selector: '[ksMediaDesktop]',
	standalone: true,
	providers: [{ provide: MEDIA_DEVICE, useExisting: MediaDesktopDirective }],
	hostDirectives: [MediaDeviceDirective],
})
export class MediaDesktopDirective implements MediaDevice {
	public readonly checkMedia = inject(MediaService).mediaDesktop;
}
