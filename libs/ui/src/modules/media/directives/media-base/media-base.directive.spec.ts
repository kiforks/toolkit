import { createDirectiveFactory } from '@ngneat/spectator/jest';

import { MediaBaseDirective } from './media-base.directive';

import { MediaElementMock } from '../../mocks/media-element.mock';

import { MEDIA_ELEMENT } from '../../tokens';

describe('MediaBaseDirective', () => {
	const createDirective = createDirectiveFactory(MediaBaseDirective);

	it('should dynamically render directive content', () => {
		const mediaElementMock = new MediaElementMock().setCheckMedia(true);

		const spyOnCheckMedia = jest.spyOn(mediaElementMock, 'checkMedia');

		createDirective(
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

		expect(mediaElementMock.condition()).toBe(true);

		expect(spyOnCheckMedia).toHaveBeenNthCalledWith(1, mediaElementMock.breakpoint());

		mediaElementMock.setCheckMedia(false);

		expect(mediaElementMock.condition()).toBe(false);
		expect(spyOnCheckMedia).toHaveBeenNthCalledWith(1, mediaElementMock.breakpoint());

		mediaElementMock.setCheckMedia(true);

		expect(mediaElementMock.condition()).toBe(true);
		expect(spyOnCheckMedia).toHaveBeenNthCalledWith(1, mediaElementMock.breakpoint());
	});
});
