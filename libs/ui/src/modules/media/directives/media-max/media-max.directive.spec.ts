import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';

import { MediaMaxDirective } from './media-max.directive';
import { MediaMaxDirectivePO } from './media-max.directive.po';

import { MediaServiceMock } from '../../mocks';

import { MediaBreakpoint } from '../../interfaces';

import { provideMediaServiceMock } from '../../providers';

describe('KsMediaMaxDirective', () => {
	let spectator: SpectatorDirective<MediaMaxDirective>;
	let directivePO: MediaMaxDirectivePO;

	const createDirective = createDirectiveFactory(MediaMaxDirective);

	it('should dynamically render directive content', () => {
		const mediaServiceMock = new MediaServiceMock().setMediaMax(true);
		const breakpoint: MediaBreakpoint = 'sm';

		const spyOnMediaMax = jest.spyOn(mediaServiceMock, 'mediaMax');

		spectator = createDirective(
			`
				<div
					*ksMediaMax="breakpoint"
					test
				>
					Test
				</div>
			`,
			{ providers: [provideMediaServiceMock(mediaServiceMock)], hostProps: { breakpoint } }
		);

		directivePO = new MediaMaxDirectivePO(spectator);

		expect(directivePO.element).toExist();
		expect(spyOnMediaMax).toHaveBeenNthCalledWith(1, breakpoint);

		const breakpointLG: MediaBreakpoint = 'lg';

		mediaServiceMock.setMediaMax(false);
		spectator.setHostInput({ breakpoint: breakpointLG });

		expect(directivePO.element).not.toExist();
		expect(spyOnMediaMax).toHaveBeenNthCalledWith(2, breakpointLG);

		const breakpointXL: MediaBreakpoint = 'xl';

		mediaServiceMock.setMediaMax(true);
		spectator.setHostInput({ breakpoint: breakpointXL });

		expect(directivePO.element).toExist();
		expect(spyOnMediaMax).toHaveBeenNthCalledWith(3, breakpointXL);
	});
});
