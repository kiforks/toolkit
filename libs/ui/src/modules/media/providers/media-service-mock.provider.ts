import { Provider } from '@angular/core';

import { MediaService } from '../services';

import { MediaServiceMock } from '../mocks';

/**
 * Utility function to provide a mock implementation of the MediaService.
 * This function is useful for testing components that depend on MediaService.
 *
 * @example
 *  ...
 *  const mediaServiceMock = new MediaServiceMock().setMediaBetween(true);
 *  ...
 * 	spectator = createDirective(
 * 		...
 * 		{ providers: [provideMediaServiceMock(mediaServiceMock)] }
 * 	);
 * 	...
 * */
export const provideMediaServiceMock = (mock: MediaServiceMock): Provider => ({
	provide: MediaService,
	useValue: mock,
});
