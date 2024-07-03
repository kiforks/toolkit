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

	const validElements = (po: MediaMinDirectivePo): void => {
		expect(po.element).toExist();
		expect(po.elements).toHaveLength(1);
	};

	const invalidElements = (po: MediaMinDirectivePo): void => {
		expect(po.element).not.toExist();
		expect(po.elements).toHaveLength(0);
	};

	const validConditionalElement = (po: MediaMinDirectivePo): void => {
		validElements(po);
		expect(directivePO.template).not.toExist();
	};

	const invalidConditionalElement = (po: MediaMinDirectivePo): void => {
		invalidElements(po);
		expect(directivePO.template).toExist();
	};

	it('should render directive content based on media breakpoint', () => {
		const mediaServiceMock = new MediaServiceMock().setMediaMin(true);
		const breakpoint: MediaBreakpoint = 'sm';

		const spyOnMediaMin = jest.spyOn(mediaServiceMock, 'mediaMin');

		spectator = createDirective(
			`
				<div
					*ksMediaMin="breakpoint"
					data-po="element"
				>
					Test
				</div>
			`,
			{ providers: [provideMediaServiceMock(mediaServiceMock)], hostProps: { breakpoint } }
		);

		directivePO = new MediaMinDirectivePo(spectator);

		validElements(directivePO);
		expect(spyOnMediaMin).toHaveBeenNthCalledWith(1, breakpoint);

		const breakpointLG: MediaBreakpoint = 'lg';

		mediaServiceMock.setMediaMin(false);
		spectator.setHostInput({ breakpoint: breakpointLG });

		invalidElements(directivePO);
		expect(spyOnMediaMin).toHaveBeenNthCalledWith(2, breakpointLG);

		const breakpointXL: MediaBreakpoint = 'xl';

		mediaServiceMock.setMediaMin(true);
		spectator.setHostInput({ breakpoint: breakpointXL });

		validElements(directivePO);
		expect(spyOnMediaMin).toHaveBeenNthCalledWith(3, breakpointXL);
	});

	it('should render directive content with complex conditions', () => {
		const mediaServiceMock = new MediaServiceMock().setMediaMin(true);
		const breakpoint: MediaBreakpoint = 'sm';

		spectator = createDirective(
			`
				<div
					*ksMediaMin="'md'; or: orCondition; and: andCondition; else templateRef;"
					data-po="element"
				>
					Test
				</div>
				
				<ng-template #templateRef>
					<span data-po="template">Template content</span>
				</ng-template>
			`,
			{
				providers: [provideMediaServiceMock(mediaServiceMock)],
				hostProps: { breakpoint, orCondition: false, andCondition: true },
			}
		);

		directivePO = new MediaMinDirectivePo(spectator);

		validConditionalElement(directivePO);

		mediaServiceMock.setMediaMin(false);
		spectator.detectChanges();

		invalidConditionalElement(directivePO);

		spectator.setHostInput({ orCondition: true });
		spectator.detectChanges();

		validConditionalElement(directivePO);

		spectator.setHostInput({ andCondition: false });
		spectator.detectChanges();

		invalidConditionalElement(directivePO);

		mediaServiceMock.setMediaMin(true);
		spectator.detectChanges();

		invalidConditionalElement(directivePO);

		spectator.setHostInput({ andCondition: true });
		spectator.detectChanges();

		validConditionalElement(directivePO);
	});
});
