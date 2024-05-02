import { MediaHelper } from './media.helper';

describe('MediaHelper', () => {
	it('getMaxWidth should return value', () => {
		expect(MediaHelper.getMaxWidth(100)).toBe('(max-width: 99.98px)');
	});

	it('getMinWidth should return value', () => {
		expect(MediaHelper.getMinWidth(100)).toBe('(min-width: 100px)');
	});
});
