import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';

import { MediaMobileDirective } from './media-mobile.directive';
import { MediaMobileDirectivePo } from './media-mobile.directive.po';

import { MediaServiceMock } from '../../mocks';

import { provideMediaServiceMock } from '../../providers';

describe('KsMediaMobileDirective', () => {
	let spectator: SpectatorDirective<MediaMobileDirective>;
	let directivePO: MediaMobileDirectivePo;

	const createDirective = createDirectiveFactory(MediaMobileDirective);

	it('should dynamically render directive content', () => {
		const mediaServiceMock = new MediaServiceMock().setAsMobile();

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
			{ providers: [provideMediaServiceMock(mediaServiceMock)] }
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
