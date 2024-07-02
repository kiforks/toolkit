import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';

import { MediaDesktopDirective } from './media-desktop.directive';
import { MediaDesktopDirectivePo } from './media-desktop.directive.po';

import { MediaServiceMock } from '../../mocks';

import { provideMediaServiceMock } from '../../providers';

describe('KsMediaDesktopDirective', () => {
	let spectator: SpectatorDirective<MediaDesktopDirective>;
	let directivePO: MediaDesktopDirectivePo;

	const createDirective = createDirectiveFactory(MediaDesktopDirective);

	it('should dynamically render directive content', () => {
		const mediaServiceMock = new MediaServiceMock().setAsDesktop();

		const spyOnMediaDesktop = jest.spyOn(mediaServiceMock, 'mediaDesktop', 'get');

		spectator = createDirective(
			`
				<div
					*ksMediaDesktop
					test
				>
					Test
				</div>
			`,
			{ providers: [provideMediaServiceMock(mediaServiceMock)] }
		);

		directivePO = new MediaDesktopDirectivePo(spectator);

		expect(directivePO.element).toExist();
		expect(spyOnMediaDesktop).toHaveBeenNthCalledWith(1);

		mediaServiceMock.setAsMobile();
		spectator.detectChanges();

		expect(directivePO.element).not.toExist();

		mediaServiceMock.setAsDesktop();
		spectator.detectChanges();

		expect(directivePO.element).toExist();
	});
});
