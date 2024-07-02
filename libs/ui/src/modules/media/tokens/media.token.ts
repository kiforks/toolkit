import { InjectionToken } from '@angular/core';

import { MediaConfig, MediaDevice, MediaElement } from '../interfaces';

/**
 * @private
 *
 * This config is not a part of package
 * Injection token for providing partial configuration for the media service.
 *
 * @remarks
 * This token is used to provide a partial configuration for the media service in Angular applications.
 *
 * @typeparam Partial<KsMediaConfig> - Partial configuration object for the media service.
 */
export const MEDIA_CONFIG_TOKEN = new InjectionToken<Partial<MediaConfig>>('MEDIA_CONFIG');

export const MEDIA_ELEMENT = new InjectionToken<MediaElement>('MEDIA_ELEMENT');
export const MEDIA_DEVICE = new InjectionToken<MediaDevice>('MEDIA_DEVICE');
