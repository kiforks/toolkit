import { Provider } from '@angular/core';

import { KsMediaService } from '../services';

import { KsMediaConfig } from '../interfaces';

import { KS_MEDIA_CONFIG_TOKEN } from '../tokens/media.token';

/**
 * Provides a configuration object for the KsMediaService.
 *
 * @remarks
 * This function generates a provider array to configure the KsMediaService with the provided partial configuration.
 */
export const provideKsMediaConfig = (config: Partial<KsMediaConfig>): Provider[] => [
	KsMediaService,
	{
		provide: KS_MEDIA_CONFIG_TOKEN,
		useValue: config,
	},
];
