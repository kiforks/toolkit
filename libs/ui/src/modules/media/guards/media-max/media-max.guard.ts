import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CanActivateFn } from '@angular/router';

import { KsMediaService } from '../../services';

import { KsMediaBreakpoint } from '../../interfaces';

/**
 * Guard to activate based on the maximum media breakpoint.
 * This guard restricts access to a route based on the current screen width being at least the specified breakpoint or wider.
 *
 * @example
 * const routes: Routes = [
 *   { path: 'example', component: ExampleComponent, canActivate: [ksMediaMaxGuard('md')] }
 * ];
 */
export const ksMediaMaxGuard: (breakpoint: KsMediaBreakpoint) => CanActivateFn =
	(breakpoint: KsMediaBreakpoint) => (): boolean => {
		const mediaService = inject(KsMediaService);
		const isMatched = toSignal(mediaService.mediaMax(breakpoint));

		return !!isMatched();
	};
