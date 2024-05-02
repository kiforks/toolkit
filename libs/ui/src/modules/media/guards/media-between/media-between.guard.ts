import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CanActivateFn } from '@angular/router';

import { KsMediaService } from '../../services';

import { KsMediaBetweenBreakpoints } from '../../interfaces';

/**
 * Function to create a guard for checking if the screen width is between specified breakpoints.
 * This guard restricts access to a route based on the current screen width.
 *
 * @example
 * const routes: Routes = [
 *   { path: 'example', component: ExampleComponent, canActivate: [ksMediaBetweenGuard(['sm', 'md'])] }
 * ];
 */
export const ksMediaBetweenGuard: (breakpoints: KsMediaBetweenBreakpoints) => CanActivateFn =
	(breakpoints: KsMediaBetweenBreakpoints) => (): boolean => {
		const mediaService = inject(KsMediaService);
		const isMatched = toSignal(mediaService.mediaBetween(breakpoints));

		return !!isMatched();
	};
