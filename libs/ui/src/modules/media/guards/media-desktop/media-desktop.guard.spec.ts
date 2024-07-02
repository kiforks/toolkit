import { MockProvider } from 'ng-mocks';
import { Injector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { MediaService } from '../../services';
import { mediaDesktopGuard } from './media-desktop.guard';

import { MediaServiceMock } from '../../mocks';

import { provideMediaServiceMock } from '../../providers';

describe('mediaDesktopGuard', () => {
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
		mediaServiceMock.setAsDesktop();

		runInInjectionContext(injector, () => expect(mediaDesktopGuard(route, router.routerState.snapshot)).toBe(true));
	});

	it('should disallow access when media service returns true', () => {
		mediaServiceMock.setAsMobile();

		runInInjectionContext(injector, () => expect(mediaDesktopGuard(route, router.routerState.snapshot)).toBe(false));
	});
});
