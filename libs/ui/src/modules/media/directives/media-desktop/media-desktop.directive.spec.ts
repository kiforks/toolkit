import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';

import { KsMediaDesktopDirective } from './media-desktop.directive';
import { MediaDesktopDirectivePo } from './media-desktop.directive.po';

import { KsMediaServiceMock } from '../../mocks';

import { provideKsMediaServiceMock } from '../../providers';

describe('KsMediaDesktopDirective', () => {
	let spectator: SpectatorDirective<KsMediaDesktopDirective>;
	let directivePO: MediaDesktopDirectivePo;

	const createDirective = createDirectiveFactory(KsMediaDesktopDirective);

	it('should dynamically render directive content', () => {
		const mediaServiceMock = new KsMediaServiceMock().setAsDesktop();

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
			{ providers: [provideKsMediaServiceMock(mediaServiceMock)] }
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
