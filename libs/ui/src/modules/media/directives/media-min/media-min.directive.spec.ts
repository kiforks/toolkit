import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';

import { KsMediaMinDirective } from './media-min.directive';
import { MediaMinDirectivePo } from './media-min.directive.po';

import { KsMediaServiceMock } from '../../mocks';

import { KsMediaBreakpoint } from '../../interfaces';

import { provideKsMediaServiceMock } from '../../providers';

describe('KsMediaMinDirective', () => {
	let spectator: SpectatorDirective<KsMediaMinDirective>;
	let directivePO: MediaMinDirectivePo;

	const createDirective = createDirectiveFactory(KsMediaMinDirective);

	it('should dynamically render directive content', () => {
		const mediaServiceMock = new KsMediaServiceMock().setMediaMin(true);
		const breakpoint: KsMediaBreakpoint = 'sm';

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
			{ providers: [provideKsMediaServiceMock(mediaServiceMock)], hostProps: { breakpoint } }
		);

		directivePO = new MediaMinDirectivePo(spectator);

		expect(directivePO.element).toExist();
		expect(spyOnMediaMin).toHaveBeenNthCalledWith(1, breakpoint);

		const breakpointLG: KsMediaBreakpoint = 'lg';

		mediaServiceMock.setMediaMin(false);
		spectator.setHostInput({ breakpoint: breakpointLG });

		expect(directivePO.element).not.toExist();
		expect(spyOnMediaMin).toHaveBeenNthCalledWith(2, breakpointLG);

		const breakpointXL: KsMediaBreakpoint = 'xl';

		mediaServiceMock.setMediaMin(true);
		spectator.setHostInput({ breakpoint: breakpointXL });

		expect(directivePO.element).toExist();
		expect(spyOnMediaMin).toHaveBeenNthCalledWith(3, breakpointXL);
	});
});
