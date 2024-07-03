import { MediaConfig } from './media.config';

describe('KsMediaConfig', () => {
	it('should have the proper values', () => {
		expect(MediaConfig.maxScreenRange).toBe(0.02);
		expect(MediaConfig.breakpointValues).toEqual(['xs', 'sm', 'md', 'lg', 'xl', 'xxl']);
		expect(MediaConfig.breakpoints).toEqual({
			lg: 992,
			md: 768,
			sm: 576,
			xl: 1200,
			xs: 0,
			xxl: 1400,
		});
	});
});
