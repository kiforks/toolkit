import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';

import { MediaBetweenDirective } from './media-between.directive';
import { MediaBetweenDirectivePO } from './media-between.directive.po';

import { MediaServiceMock } from '../../mocks';

import { MediaBetweenBreakpoints } from '../../interfaces';

import { provideMediaServiceMock } from '../../providers';

describe('MediaBetweenDirective', () => {
	let spectator: SpectatorDirective<MediaBetweenDirective>;
	let directivePO: MediaBetweenDirectivePO;

	const createDirective = createDirectiveFactory(MediaBetweenDirective);

	it('should dynamically render directive content', () => {
		const mediaServiceMock = new MediaServiceMock().setMediaBetween(true);
		const breakpoints: MediaBetweenBreakpoints = ['sm', 'lg'];
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
			{ providers: [provideMediaServiceMock(mediaServiceMock)], hostProps: { breakpoints } }
		);

		directivePO = new MediaBetweenDirectivePO(spectator);

		expect(directivePO.element).toExist();
		expect(spyOnMediaBetween).toHaveBeenNthCalledWith(1, breakpoints);

		const fromXLToXXL: MediaBetweenBreakpoints = ['xl', 'xxl'];

		mediaServiceMock.setMediaBetween(false);
		spectator.setHostInput({ breakpoints: fromXLToXXL });

		expect(directivePO.element).not.toExist();
		expect(spyOnMediaBetween).toHaveBeenNthCalledWith(2, fromXLToXXL);

		const fromXSToMD: MediaBetweenBreakpoints = ['xs', 'md'];

		mediaServiceMock.setMediaBetween(true);
		spectator.setHostInput({ breakpoints: fromXSToMD });

		expect(directivePO.element).toExist();
		expect(spyOnMediaBetween).toHaveBeenNthCalledWith(3, fromXSToMD);
	});
});
