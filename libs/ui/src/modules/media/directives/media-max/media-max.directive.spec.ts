import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';

import { MediaMaxDirective } from './media-max.directive';
import { MediaMaxDirectivePO } from './media-max.directive.po';

import { MediaServiceMock } from '../../mocks';

import { MediaBreakpoint } from '../../interfaces';

import { provideMediaServiceMock } from '../../providers';

describe('MediaMaxDirective', () => {
	let spectator: SpectatorDirective<MediaMaxDirective>;
	let directivePO: MediaMaxDirectivePO;

	const createDirective = createDirectiveFactory(MediaMaxDirective);

	const validElements = (po: MediaMaxDirectivePO): void => {
		expect(po.element).toExist();
		expect(po.elements).toHaveLength(1);
	};

	const invalidElements = (po: MediaMaxDirectivePO): void => {
		expect(po.element).not.toExist();
		expect(po.elements).toHaveLength(0);
	};

	const validConditionalElement = (po: MediaMaxDirectivePO): void => {
		validElements(po);
		expect(directivePO.template).not.toExist();
	};

	const invalidConditionalElement = (po: MediaMaxDirectivePO): void => {
		invalidElements(po);
		expect(directivePO.template).toExist();
	};

	it('should render directive content based on media breakpoint', () => {
		const mediaServiceMock = new MediaServiceMock().setMediaMax(true);
		const breakpoint: MediaBreakpoint = 'sm';

		const spyOnMediaMax = jest.spyOn(mediaServiceMock, 'mediaMax');

		spectator = createDirective(
			`
				<div
					*ksMediaMax="breakpoint"
					data-po="element"
				>
					Test
				</div>
			`,
			{ providers: [provideMediaServiceMock(mediaServiceMock)], hostProps: { breakpoint } }
		);

		directivePO = new MediaMaxDirectivePO(spectator);

		validElements(directivePO);
		expect(spyOnMediaMax).toHaveBeenNthCalledWith(1, breakpoint);

		const breakpointLG: MediaBreakpoint = 'lg';

		mediaServiceMock.setMediaMax(false);
		spectator.setHostInput({ breakpoint: breakpointLG });

		invalidElements(directivePO);
		expect(spyOnMediaMax).toHaveBeenNthCalledWith(2, breakpointLG);

		const breakpointXL: MediaBreakpoint = 'xl';

		mediaServiceMock.setMediaMax(true);
		spectator.setHostInput({ breakpoint: breakpointXL });

		validElements(directivePO);
		expect(spyOnMediaMax).toHaveBeenNthCalledWith(3, breakpointXL);
	});

	it('should render directive content with complex conditions', () => {
		const mediaServiceMock = new MediaServiceMock().setMediaMax(true);
		const breakpoint: MediaBreakpoint = 'sm';

		spectator = createDirective(
			`
				<div
					*ksMediaMax="'md'; or: orCondition; and: andCondition; else templateRef;"
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

		directivePO = new MediaMaxDirectivePO(spectator);

		validConditionalElement(directivePO);

		mediaServiceMock.setMediaMax(false);
		spectator.detectChanges();

		invalidConditionalElement(directivePO);

		spectator.setHostInput({ orCondition: true });
		spectator.detectChanges();

		validConditionalElement(directivePO);

		spectator.setHostInput({ andCondition: false });
		spectator.detectChanges();

		invalidConditionalElement(directivePO);

		mediaServiceMock.setMediaMax(true);
		spectator.detectChanges();

		invalidConditionalElement(directivePO);

		spectator.setHostInput({ andCondition: true });
		spectator.detectChanges();

		validConditionalElement(directivePO);
	});
});
