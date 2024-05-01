import { MediaHelper } from './media.helper';

describe('MediaHelper', () => {
	it('getMaxWidth should return value', () => {
		expect(MediaHelper.getMaxWidth(1)).toBe('(max-width: 1px)');
	});

	it('getMinWidth should return value', () => {
		expect(MediaHelper.getMinWidth(1)).toBe('(min-width: 1px)');
	});
});
