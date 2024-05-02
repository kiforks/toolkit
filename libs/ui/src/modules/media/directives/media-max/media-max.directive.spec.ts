import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';

import { KsMediaMaxDirective } from './media-max.directive';
import { MediaMaxDirectivePO } from './media-max.directive.po';

import { KsMediaServiceMock } from '../../mocks';

import { KsMediaBreakpoint } from '../../interfaces';

import { provideKsMediaServiceMock } from '../../providers';

describe('KsMediaMaxDirective', () => {
	let spectator: SpectatorDirective<KsMediaMaxDirective>;
	let directivePO: MediaMaxDirectivePO;

	const createDirective = createDirectiveFactory(KsMediaMaxDirective);

	it('should dynamically render directive content', () => {
		const mediaServiceMock = new KsMediaServiceMock().setMediaMax(true);
		const breakpoint: KsMediaBreakpoint = 'sm';

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
			{ providers: [provideKsMediaServiceMock(mediaServiceMock)], hostProps: { breakpoint } }
		);

		directivePO = new MediaMaxDirectivePO(spectator);

		expect(directivePO.element).toExist();
		expect(spyOnMediaMax).toHaveBeenNthCalledWith(1, breakpoint);

		const breakpointLG: KsMediaBreakpoint = 'lg';

		mediaServiceMock.setMediaMax(false);
		spectator.setHostInput({ breakpoint: breakpointLG });

		expect(directivePO.element).not.toExist();
		expect(spyOnMediaMax).toHaveBeenNthCalledWith(2, breakpointLG);

		const breakpointXL: KsMediaBreakpoint = 'xl';

		mediaServiceMock.setMediaMax(true);
		spectator.setHostInput({ breakpoint: breakpointXL });

		expect(directivePO.element).toExist();
		expect(spyOnMediaMax).toHaveBeenNthCalledWith(3, breakpointXL);
	});
});
