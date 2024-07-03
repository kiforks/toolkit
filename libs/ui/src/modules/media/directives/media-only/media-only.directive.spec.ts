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

	const validElements = (po: MediaOnlyDirectivePo): void => {
		expect(po.element).toExist();
		expect(po.elements).toHaveLength(1);
	};

	const invalidElements = (po: MediaOnlyDirectivePo): void => {
		expect(po.element).not.toExist();
		expect(po.elements).toHaveLength(0);
	};

	const validConditionalElement = (po: MediaOnlyDirectivePo): void => {
		validElements(po);
		expect(directivePO.template).not.toExist();
	};

	const invalidConditionalElement = (po: MediaOnlyDirectivePo): void => {
		invalidElements(po);
		expect(directivePO.template).toExist();
	};

	it('should render directive content based on media breakpoint', () => {
		const mediaServiceMock = new MediaServiceMock().setMediaOnly(true);
		const breakpoint: MediaBreakpoint = 'sm';

		const spyOnMediaOnly = jest.spyOn(mediaServiceMock, 'mediaOnly');

		spectator = createDirective(
			`
				<div
					*ksMediaOnly="breakpoint"
					data-po="element"
				>
					Test
				</div>
			`,
			{ providers: [provideMediaServiceMock(mediaServiceMock)], hostProps: { breakpoint } }
		);

		directivePO = new MediaOnlyDirectivePo(spectator);

		validElements(directivePO);
		expect(spyOnMediaOnly).toHaveBeenNthCalledWith(1, breakpoint);

		const breakpointLG: MediaBreakpoint = 'lg';

		mediaServiceMock.setMediaOnly(false);
		spectator.setHostInput({ breakpoint: breakpointLG });

		invalidElements(directivePO);
		expect(spyOnMediaOnly).toHaveBeenNthCalledWith(2, breakpointLG);

		const breakpointXL: MediaBreakpoint = 'xl';

		mediaServiceMock.setMediaOnly(true);
		spectator.setHostInput({ breakpoint: breakpointXL });

		validElements(directivePO);
		expect(spyOnMediaOnly).toHaveBeenNthCalledWith(3, breakpointXL);
	});

	it('should render directive content with complex conditions', () => {
		const mediaServiceMock = new MediaServiceMock().setMediaOnly(true);
		const breakpoint: MediaBreakpoint = 'sm';

		spectator = createDirective(
			`
				<div
					*ksMediaOnly="'md'; or: orCondition; and: andCondition; else templateRef;"
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

		directivePO = new MediaOnlyDirectivePo(spectator);

		validConditionalElement(directivePO);

		mediaServiceMock.setMediaOnly(false);
		spectator.detectChanges();

		invalidConditionalElement(directivePO);

		spectator.setHostInput({ orCondition: true });
		spectator.detectChanges();

		validConditionalElement(directivePO);

		spectator.setHostInput({ andCondition: false });
		spectator.detectChanges();

		invalidConditionalElement(directivePO);

		mediaServiceMock.setMediaOnly(true);
		spectator.detectChanges();

		invalidConditionalElement(directivePO);

		spectator.setHostInput({ andCondition: true });
		spectator.detectChanges();

		validConditionalElement(directivePO);
	});
});
