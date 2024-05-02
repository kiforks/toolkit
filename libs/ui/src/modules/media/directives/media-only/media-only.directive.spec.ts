import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';

import { KsMediaOnlyDirective } from './media-only.directive';
import { MediaOnlyDirectivePo } from './media-only.directive.po';

import { KsMediaServiceMock } from '../../mocks';

import { KsMediaBreakpoint } from '../../interfaces';

import { provideKsMediaServiceMock } from '../../providers';

describe('KsMediaOnlyDirective', () => {
	let spectator: SpectatorDirective<KsMediaOnlyDirective>;
	let directivePO: MediaOnlyDirectivePo;

	const createDirective = createDirectiveFactory(KsMediaOnlyDirective);

	it('should dynamically render directive content', () => {
		const mediaServiceMock = new KsMediaServiceMock().setMediaOnly(true);
		const breakpoint: KsMediaBreakpoint = 'sm';

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
			{ providers: [provideKsMediaServiceMock(mediaServiceMock)], hostProps: { breakpoint } }
		);

		directivePO = new MediaOnlyDirectivePo(spectator);

		expect(directivePO.element).toExist();
		expect(spyOnMediaOnly).toHaveBeenNthCalledWith(1, breakpoint);

		const breakpointLG: KsMediaBreakpoint = 'lg';

		mediaServiceMock.setMediaOnly(false);
		spectator.setHostInput({ breakpoint: breakpointLG });

		expect(directivePO.element).not.toExist();
		expect(spyOnMediaOnly).toHaveBeenNthCalledWith(2, breakpointLG);

		const breakpointXL: KsMediaBreakpoint = 'xl';

		mediaServiceMock.setMediaOnly(true);
		spectator.setHostInput({ breakpoint: breakpointXL });

		expect(directivePO.element).toExist();
		expect(spyOnMediaOnly).toHaveBeenNthCalledWith(3, breakpointXL);
	});
});
