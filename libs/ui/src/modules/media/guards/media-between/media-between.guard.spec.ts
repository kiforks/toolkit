import { MockProvider } from 'ng-mocks';
import { Injector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { MediaService } from '../../services';
import { mediaBetweenGuard } from './media-between.guard';

import { MediaServiceMock } from '../../mocks';

import { provideMediaServiceMock } from '../../providers';

describe('ksMediaBetweenGuard', () => {
	let injector: Injector;
	let router: Router;
	let route: ActivatedRouteSnapshot;

	const mediaServiceMock = new MediaServiceMock();

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [MediaService, MockProvider(ActivatedRouteSnapshot), provideMediaServiceMock(mediaServiceMock)],
		});

		injector = TestBed.inject(Injector);

		route = injector.get(ActivatedRouteSnapshot);
		router = injector.get(Router);
	});

	it('should allow access when media service returns true', () => {
		mediaServiceMock.setMediaBetween(true);

		runInInjectionContext(injector, () =>
			expect(mediaBetweenGuard(['md', 'lg'])(route, router.routerState.snapshot)).toBe(true)
		);
	});

	it('should disallow access when media service returns true', () => {
		mediaServiceMock.setMediaBetween(false);

		runInInjectionContext(injector, () =>
			expect(mediaBetweenGuard(['md', 'lg'])(route, router.routerState.snapshot)).toBe(false)
		);
	});
});
