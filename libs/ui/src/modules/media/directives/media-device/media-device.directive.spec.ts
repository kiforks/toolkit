import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';

import { MediaDeviceDirective } from './media-device.directive';
import { MediaDeviceDirectivePo } from './media-device.directive.po';

import { MediaDeviceMock } from '../../mocks/media-device.mock';

import { MEDIA_DEVICE } from '../../tokens/media.token';

describe('MediaDeviceDirective', () => {
	let spectator: SpectatorDirective<MediaDeviceDirective>;
	let directivePO: MediaDeviceDirectivePo;

	const createDirective = createDirectiveFactory(MediaDeviceDirective);

	it('should dynamically render directive content', () => {
		const mediaDeviceMock = new MediaDeviceMock().setCheckMedia(true);

		const spyOnCheckMedia = jest.spyOn(mediaDeviceMock, 'checkMedia', 'get');

		spectator = createDirective(
			`
				<div
					*ksMediaDevice
					test
				>
					Test
				</div>
			`,
			{ providers: [{ provide: MEDIA_DEVICE, useValue: mediaDeviceMock }] }
		);

		directivePO = new MediaDeviceDirectivePo(spectator);

		expect(directivePO.element).toExist();
		expect(directivePO.elements).toHaveLength(1);
		expect(spyOnCheckMedia).toHaveBeenNthCalledWith(1);

		mediaDeviceMock.setCheckMedia(false);
		spectator.detectChanges();

		expect(directivePO.element).not.toExist();
		expect(directivePO.elements).toHaveLength(0);
		expect(spyOnCheckMedia).toHaveBeenNthCalledWith(1);

		mediaDeviceMock.setCheckMedia(true);
		spectator.detectChanges();

		expect(directivePO.element).toExist();
		expect(directivePO.elements).toHaveLength(1);
		expect(spyOnCheckMedia).toHaveBeenNthCalledWith(1);
	});
});
