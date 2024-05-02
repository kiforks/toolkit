import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CanActivateFn } from '@angular/router';

import { KsMediaService } from '../../services';

/**
 * Guard to activate based on the mobile media breakpoint.
 * This guard restricts access to a route based on the current screen width being mobile or narrower.
 *
 * @example
 * const routes: Routes = [
 *   { path: 'example', component: ExampleComponent, canActivate: [ksMediaMobileGuard] }
 * ];
 */
export const ksMediaMobileGuard: CanActivateFn = (): boolean => {
	const mediaService = inject(KsMediaService);
	const isMatched = toSignal(mediaService.mediaMobile);

	return !!isMatched();
};
