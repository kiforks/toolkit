import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';

import { MediaMinDirective } from './media-min.directive';
import { MediaMinDirectivePo } from './media-min.directive.po';

import { MediaServiceMock } from '../../mocks';

import { MediaBreakpoint } from '../../interfaces';

import { provideMediaServiceMock } from '../../providers';

describe('MediaMinDirective', () => {
	let spectator: SpectatorDirective<MediaMinDirective>;
	let directivePO: MediaMinDirectivePo;

	const createDirective = createDirectiveFactory(MediaMinDirective);

	it('should dynamically render directive content', () => {
		const mediaServiceMock = new MediaServiceMock().setMediaMin(true);
		const breakpoint: MediaBreakpoint = 'sm';

		const spyOnMediaMin = jest.spyOn(mediaServiceMock, 'mediaMin');

		spectator = createDirective(
			`
				<div
					*ksMediaMin="breakpoint"
					test
				>
					Test
				</div>
			`,
			{ providers: [provideMediaServiceMock(mediaServiceMock)], hostProps: { breakpoint } }
		);

		directivePO = new MediaMinDirectivePo(spectator);

		expect(directivePO.element).toExist();
		expect(spyOnMediaMin).toHaveBeenNthCalledWith(1, breakpoint);

		const breakpointLG: MediaBreakpoint = 'lg';

		mediaServiceMock.setMediaMin(false);
		spectator.setHostInput({ breakpoint: breakpointLG });

		expect(directivePO.element).not.toExist();
		expect(spyOnMediaMin).toHaveBeenNthCalledWith(2, breakpointLG);

		const breakpointXL: MediaBreakpoint = 'xl';

		mediaServiceMock.setMediaMin(true);
		spectator.setHostInput({ breakpoint: breakpointXL });

		expect(directivePO.element).toExist();
		expect(spyOnMediaMin).toHaveBeenNthCalledWith(3, breakpointXL);
	});
});
