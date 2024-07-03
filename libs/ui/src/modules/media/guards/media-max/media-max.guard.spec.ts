import { MockProvider } from 'ng-mocks';
import { Injector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { MediaService } from '../../services';
import { mediaMaxGuard } from './media-max.guard';

import { MediaServiceMock } from '../../mocks';

import { provideMediaServiceMock } from '../../providers';

describe('mediaMaxGuard', () => {
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
		mediaServiceMock.setMediaMax(true);

		runInInjectionContext(injector, () => expect(mediaMaxGuard('md')(route, router.routerState.snapshot)).toBe(true));
	});

	it('should disallow access when media service returns true', () => {
		mediaServiceMock.setMediaMax(false);

		runInInjectionContext(injector, () => expect(mediaMaxGuard('md')(route, router.routerState.snapshot)).toBe(false));
	});
});
