import { Provider } from '@angular/core';

import { KsMediaService } from '../services';

import { KsMediaServiceMock } from '../mocks';

/**
 * Utility function to provide a mock implementation of the KsMediaService.
 * This function is useful for testing components that depend on KsMediaService.
 *
 * @example
 *  ...
 *  const mediaServiceMock = new KsMediaServiceMock().setMediaBetween(true);
 *  ...
 * 	spectator = createDirective(
 * 		...
 * 		{ providers: [provideKsMediaServiceMock(mediaServiceMock)] }
 * 	);
 * 	...
 * */
export const provideKsMediaServiceMock = (mock: KsMediaServiceMock): Provider => ({
	provide: KsMediaService,
	useValue: mock,
});
