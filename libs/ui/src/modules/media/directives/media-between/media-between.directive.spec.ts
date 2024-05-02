import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';

import { KsMediaBetweenDirective } from './media-between.directive';
import { MediaBetweenDirectivePO } from './media-between.directive.po';

import { KsMediaServiceMock } from '../../mocks';

import { KsMediaBetweenBreakpoints } from '../../interfaces';

import { provideKsMediaServiceMock } from '../../providers';

describe('KsMediaBetweenDirective', () => {
	let spectator: SpectatorDirective<KsMediaBetweenDirective>;
	let directivePO: MediaBetweenDirectivePO;

	const createDirective = createDirectiveFactory(KsMediaBetweenDirective);

	it('should dynamically render directive content', () => {
		const mediaServiceMock = new KsMediaServiceMock().setMediaBetween(true);
		const breakpoints: KsMediaBetweenBreakpoints = ['sm', 'lg'];
		const spyOnMediaBetween = jest.spyOn(mediaServiceMock, 'mediaBetween');

		spectator = createDirective(
			`
				<div
					*ksMediaBetween="breakpoints"
					test
				>
					Test
				</div>
			`,
			{ providers: [provideKsMediaServiceMock(mediaServiceMock)], hostProps: { breakpoints } }
		);

		directivePO = new MediaBetweenDirectivePO(spectator);

		expect(directivePO.element).toExist();
		expect(spyOnMediaBetween).toHaveBeenNthCalledWith(1, breakpoints);

		const fromXLToXXL: KsMediaBetweenBreakpoints = ['xl', 'xxl'];

		mediaServiceMock.setMediaBetween(false);
		spectator.setHostInput({ breakpoints: fromXLToXXL });

		expect(directivePO.element).not.toExist();
		expect(spyOnMediaBetween).toHaveBeenNthCalledWith(2, fromXLToXXL);

		const fromXSToMD: KsMediaBetweenBreakpoints = ['xs', 'md'];

		mediaServiceMock.setMediaBetween(true);
		spectator.setHostInput({ breakpoints: fromXSToMD });

		expect(directivePO.element).toExist();
		expect(spyOnMediaBetween).toHaveBeenNthCalledWith(3, fromXSToMD);
	});
});
