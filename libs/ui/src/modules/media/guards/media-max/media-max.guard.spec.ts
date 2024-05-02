import { MockProvider } from 'ng-mocks';
import { Injector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { KsMediaService } from '../../services';
import { ksMediaMaxGuard } from './media-max.guard';

import { KsMediaServiceMock } from '../../mocks';

import { provideKsMediaServiceMock } from '../../providers';

describe('ksMediaMaxGuard', () => {
	let injector: Injector;
	let router: Router;
	let route: ActivatedRouteSnapshot;

	const mediaServiceMock = new KsMediaServiceMock();

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [KsMediaService, MockProvider(ActivatedRouteSnapshot), provideKsMediaServiceMock(mediaServiceMock)],
		});

		injector = TestBed.inject(Injector);

		route = injector.get(ActivatedRouteSnapshot);
		router = injector.get(Router);
	});

	it('should allow access when media service returns true', () => {
		mediaServiceMock.setMediaMax(true);

		runInInjectionContext(injector, () => expect(ksMediaMaxGuard('md')(route, router.routerState.snapshot)).toBe(true));
	});

	it('should disallow access when media service returns true', () => {
		mediaServiceMock.setMediaMax(false);

		runInInjectionContext(injector, () =>
			expect(ksMediaMaxGuard('md')(route, router.routerState.snapshot)).toBe(false)
		);
	});
});
