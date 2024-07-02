import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CanActivateFn } from '@angular/router';
import { Breakpoint } from '@kiforks/core';

import { MediaService } from '../../services';

/**
 * Guard to activate only on a specific media breakpoint.
 * This guard restricts access to a route based on the current screen width matching the specified breakpoint.
 *
 * @example
 * const routes: Routes = [
 *   { path: 'example', component: ExampleComponent, canActivate: [mdiaOnlyGuard('md')] }
 * ];
 */
export const mediaOnlyGuard: (breakpoint: Breakpoint) => CanActivateFn = (breakpoint: Breakpoint) => (): boolean => {
	const mediaService = inject(MediaService);
	const isMatched = toSignal(mediaService.mediaOnly(breakpoint));

	return !!isMatched();
};
