import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';

import { KsMediaMobileDirective } from './media-mobile.directive';
import { MediaMobileDirectivePo } from './media-mobile.directive.po';

import { KsMediaServiceMock } from '../../mocks';

import { provideKsMediaServiceMock } from '../../providers';

describe('KsMediaMobileDirective', () => {
	let spectator: SpectatorDirective<KsMediaMobileDirective>;
	let directivePO: MediaMobileDirectivePo;

	const createDirective = createDirectiveFactory(KsMediaMobileDirective);

	it('should dynamically render directive content', () => {
		const mediaServiceMock = new KsMediaServiceMock().setAsMobile();

		const spyOnMediaMobile = jest.spyOn(mediaServiceMock, 'mediaMobile', 'get');

		spectator = createDirective(
			`
				<div
					*ksMediaMobile
					test
				>
					Test
				</div>
			`,
			{ providers: [provideKsMediaServiceMock(mediaServiceMock)] }
		);

		directivePO = new MediaMobileDirectivePo(spectator);

		expect(directivePO.element).toExist();
		expect(spyOnMediaMobile).toHaveBeenNthCalledWith(1);

		mediaServiceMock.setAsDesktop();
		spectator.detectChanges();

		expect(directivePO.element).not.toExist();

		mediaServiceMock.setAsMobile();
		spectator.detectChanges();

		expect(directivePO.element).toExist();
	});
});
