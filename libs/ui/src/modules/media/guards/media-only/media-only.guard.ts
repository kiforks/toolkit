import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CanActivateFn } from '@angular/router';
import { Breakpoint } from '@kiforks/core';

import { KsMediaService } from '../../services';

/**
 * Guard to activate only on a specific media breakpoint.
 * This guard restricts access to a route based on the current screen width matching the specified breakpoint.
 *
 * @example
 * const routes: Routes = [
 *   { path: 'example', component: ExampleComponent, canActivate: [ksMediaOnlyGuard('md')] }
 * ];
 */
export const ksMediaOnlyGuard: (breakpoint: Breakpoint) => CanActivateFn = (breakpoint: Breakpoint) => (): boolean => {
	const mediaService = inject(KsMediaService);
	const isMatched = toSignal(mediaService.mediaOnly(breakpoint));

	return !!isMatched();
};
