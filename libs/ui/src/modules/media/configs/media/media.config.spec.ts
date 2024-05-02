import { KS_MEDIA_CONFIG } from './media.config';

describe('KsMediaConfig', () => {
	it('should have the proper values', () => {
		expect(KS_MEDIA_CONFIG.maxScreenRange).toBe(0.02);
		expect(KS_MEDIA_CONFIG.breakpointValues).toEqual(['xs', 'sm', 'md', 'lg', 'xl', 'xxl']);
		expect(KS_MEDIA_CONFIG.breakpoints).toEqual({
			lg: 992,
			md: 768,
			sm: 576,
			xl: 1200,
			xs: 0,
			xxl: 1400,
		});
	});
});
