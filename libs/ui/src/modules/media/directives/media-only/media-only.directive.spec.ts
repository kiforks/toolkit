import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';

import { MediaOnlyDirective } from './media-only.directive';
import { MediaOnlyDirectivePo } from './media-only.directive.po';

import { MediaServiceMock } from '../../mocks';

import { MediaBreakpoint } from '../../interfaces';

import { provideMediaServiceMock } from '../../providers';

describe('MediaOnlyDirective', () => {
	let spectator: SpectatorDirective<MediaOnlyDirective>;
	let directivePO: MediaOnlyDirectivePo;

	const createDirective = createDirectiveFactory(MediaOnlyDirective);

	it('should dynamically render directive content', () => {
		const mediaServiceMock = new MediaServiceMock().setMediaOnly(true);
		const breakpoint: MediaBreakpoint = 'sm';

		const spyOnMediaOnly = jest.spyOn(mediaServiceMock, 'mediaOnly');

		spectator = createDirective(
			`
				<div
					*ksMediaOnly="breakpoint"
					test
				>
					Test
				</div>
			`,
			{ providers: [provideMediaServiceMock(mediaServiceMock)], hostProps: { breakpoint } }
		);

		directivePO = new MediaOnlyDirectivePo(spectator);

		expect(directivePO.element).toExist();
		expect(directivePO.elements).toHaveLength(1);
		expect(spyOnMediaOnly).toHaveBeenNthCalledWith(1, breakpoint);

		const breakpointLG: MediaBreakpoint = 'lg';

		mediaServiceMock.setMediaOnly(false);
		spectator.setHostInput({ breakpoint: breakpointLG });

		expect(directivePO.element).not.toExist();
		expect(directivePO.elements).toHaveLength(0);
		expect(spyOnMediaOnly).toHaveBeenNthCalledWith(2, breakpointLG);

		const breakpointXL: MediaBreakpoint = 'xl';

		mediaServiceMock.setMediaOnly(true);
		spectator.setHostInput({ breakpoint: breakpointXL });

		expect(directivePO.element).toExist();
		expect(directivePO.elements).toHaveLength(1);
		expect(spyOnMediaOnly).toHaveBeenNthCalledWith(3, breakpointXL);
	});
});
