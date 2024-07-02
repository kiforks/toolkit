import { Directive, inject } from '@angular/core';

import { MediaService } from '../../services';

import { MediaDeviceDirective } from '../media-device/media-device.directive';

import { MediaDevice } from '../../interfaces';

import { MEDIA_DEVICE } from '../../tokens/media.token';

/**
 * The `MediaDesktopDirective` is designed to handle media queries for desktop devices.
 * It uses the `MediaDeviceDirective` as a host directive to leverage its logic for media query handling.
 *
 * Example usage in the DOM:
 * ```html
 * <div *ksMediaDesktop>
 *   This content will only be displayed on desktop devices.
 * </div>
 * ```
 * This directive is identical to the "media-desktop" mixin you can see here:
 * @see libs/ui/scss/utilities/media/mixins/_media-desktop.scss
 */
@Directive({
	selector: '[ksMediaDesktop]',
	standalone: true,
	providers: [{ provide: MEDIA_DEVICE, useExisting: MediaDesktopDirective }],
	hostDirectives: [MediaDeviceDirective],
})
export class MediaDesktopDirective implements MediaDevice {
	public readonly checkMedia = inject(MediaService).mediaDesktop;
}
