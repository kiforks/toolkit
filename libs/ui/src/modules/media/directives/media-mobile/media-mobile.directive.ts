import { Directive, inject } from '@angular/core';

import { MediaService } from '../../services';

import { MediaDeviceDirective } from '../media-device/media-device.directive';

import { MediaDevice } from '../../interfaces';

import { MEDIA_DEVICE } from '../../tokens/media.token';

@Directive({
	selector: '[ksMediaMobile]',
	standalone: true,
	providers: [{ provide: MEDIA_DEVICE, useExisting: MediaMobileDirective }],
	hostDirectives: [MediaDeviceDirective],
})
export class MediaMobileDirective implements MediaDevice {
	public readonly checkMedia = inject(MediaService).mediaMobile;
}
