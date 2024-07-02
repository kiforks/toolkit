import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';

import { MediaBaseDirective } from './media-base.directive';
import { MediaBaseDirectivePO } from './media-base.directive.po';

import { MediaElementMock } from '../../mocks/media-element.mock';

import { MEDIA_ELEMENT } from '../../tokens';

describe('MediaBaseDirective', () => {
	let spectator: SpectatorDirective<MediaBaseDirective>;
	let directivePO: MediaBaseDirectivePO;

	const createDirective = createDirectiveFactory(MediaBaseDirective);

	it('should dynamically render directive content', () => {
		const mediaElementMock = new MediaElementMock().setCheckMedia(true);

		const spyOnCheckMedia = jest.spyOn(mediaElementMock, 'checkMedia');

		spectator = createDirective(
			`
				<div
					*ksMediaBase
					test
				>
					Test
				</div>
			`,
			{ providers: [{ provide: MEDIA_ELEMENT, useValue: mediaElementMock }] }
		);

		directivePO = new MediaBaseDirectivePO(spectator);

		expect(directivePO.element).toExist();
		expect(directivePO.elements).toHaveLength(1);

		expect(spyOnCheckMedia).toHaveBeenNthCalledWith(1, mediaElementMock.breakpoint());

		mediaElementMock.setCheckMedia(false);
		spectator.detectChanges();

		expect(directivePO.element).not.toExist();
		expect(directivePO.elements).toHaveLength(0);
		expect(spyOnCheckMedia).toHaveBeenNthCalledWith(1, mediaElementMock.breakpoint());

		mediaElementMock.setCheckMedia(true);
		spectator.detectChanges();

		expect(directivePO.element).toExist();
		expect(directivePO.elements).toHaveLength(1);
		expect(spyOnCheckMedia).toHaveBeenNthCalledWith(1, mediaElementMock.breakpoint());
	});
});
