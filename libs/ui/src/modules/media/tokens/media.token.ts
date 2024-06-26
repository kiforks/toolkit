import { InjectionToken } from '@angular/core';

import { KsMediaConfig } from '../interfaces';

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
export const KS_MEDIA_CONFIG_TOKEN = new InjectionToken<Partial<KsMediaConfig>>('MEDIA_CONFIG');
