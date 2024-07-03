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

	const validElements = (po: MediaBetweenDirectivePO): void => {
		expect(po.element).toExist();
		expect(po.elements).toHaveLength(1);
	};

	const invalidElements = (po: MediaBetweenDirectivePO): void => {
		expect(po.element).not.toExist();
		expect(po.elements).toHaveLength(0);
	};

	const validConditionalElement = (po: MediaBetweenDirectivePO): void => {
		validElements(po);
		expect(directivePO.template).not.toExist();
	};

	const invalidConditionalElement = (po: MediaBetweenDirectivePO): void => {
		invalidElements(po);
		expect(directivePO.template).toExist();
	};

	it('should render directive content based on media breakpoints', () => {
		const mediaServiceMock = new MediaServiceMock().setMediaBetween(true);
		const breakpoints: MediaBetweenBreakpoints = ['sm', 'lg'];

		const spyOnMediaBetween = jest.spyOn(mediaServiceMock, 'mediaBetween');

		spectator = createDirective(
			`
				<div
					*ksMediaBetween="breakpoints"
					data-po="element"
				>
					Test
				</div>
			`,
			{ providers: [provideMediaServiceMock(mediaServiceMock)], hostProps: { breakpoints } }
		);

		directivePO = new MediaBetweenDirectivePO(spectator);

		validElements(directivePO);
		expect(spyOnMediaBetween).toHaveBeenNthCalledWith(1, breakpoints);

		const fromXLToXXL: MediaBetweenBreakpoints = ['xl', 'xxl'];

		mediaServiceMock.setMediaBetween(false);
		spectator.setHostInput({ breakpoints: fromXLToXXL });

		invalidElements(directivePO);
		expect(spyOnMediaBetween).toHaveBeenNthCalledWith(2, fromXLToXXL);

		const fromXSToMD: MediaBetweenBreakpoints = ['xs', 'md'];

		mediaServiceMock.setMediaBetween(true);
		spectator.setHostInput({ breakpoints: fromXSToMD });

		validElements(directivePO);
		expect(spyOnMediaBetween).toHaveBeenNthCalledWith(3, fromXSToMD);
	});

	it('should render directive content with complex conditions', () => {
		const mediaServiceMock = new MediaServiceMock().setMediaBetween(true);
		const breakpoints: MediaBetweenBreakpoints = ['sm', 'lg'];

		spectator = createDirective(
			`
				<div
					*ksMediaBetween="['md', 'lg']; or: orCondition; and: andCondition; else templateRef;"
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
				hostProps: { breakpoints, orCondition: false, andCondition: true },
			}
		);

		directivePO = new MediaBetweenDirectivePO(spectator);

		validConditionalElement(directivePO);

		mediaServiceMock.setMediaBetween(false);
		spectator.detectChanges();

		invalidConditionalElement(directivePO);

		spectator.setHostInput({ orCondition: true });
		spectator.detectChanges();

		validConditionalElement(directivePO);

		spectator.setHostInput({ andCondition: false });
		spectator.detectChanges();

		invalidConditionalElement(directivePO);

		mediaServiceMock.setMediaBetween(true);
		spectator.detectChanges();

		invalidConditionalElement(directivePO);

		spectator.setHostInput({ andCondition: true });
		spectator.detectChanges();

		validConditionalElement(directivePO);
	});
});
