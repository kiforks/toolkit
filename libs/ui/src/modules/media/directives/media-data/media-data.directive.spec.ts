import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';

import { KsMediaDataDirective } from './media-data.directive';

import { KsMediaServiceMock } from '../../mocks';

import { provideKsMediaServiceMock } from '../../providers';

describe('KsMediaDataDirective', () => {
	let spectator: SpectatorDirective<KsMediaDataDirective>;

	const createDirective = createDirectiveFactory(KsMediaDataDirective);

	it('should render value when all media-min values are matched', () => {
		const mediaServiceMock = new KsMediaServiceMock().setMediaAll(true);

		spectator = createDirective(
			`
				<div
					*ksMediaData="
						let mediaMobile = mediaMobile;
						let mediaDesktop = mediaMobile;
						let mediaMin = mediaMin;
						let mediaMax = mediaMax;
						let mediaBetween = mediaBetween;
						let mediaOnly = mediaOnly;
					"
				>
					Media mobile: {{ mediaMobile | async }}
					Media desktop: {{ mediaDesktop | async }}
					Media min: {{ mediaMin('md') | async }}
					Media max: {{ mediaMax('md') | async }}
					Media between: {{ mediaBetween(['md', 'xl']) | async }}
					Media only: {{ mediaOnly('md') | async }}
				</div>
			`,
			{ providers: [provideKsMediaServiceMock(mediaServiceMock)] }
		);

		expect(spectator.element).toHaveExactTrimmedText(
			'Media mobile: true Media desktop: true Media min: true Media max: true Media between: true Media only: true'
		);
	});

	it('should render value when all media-min values are not matched', () => {
		const mediaServiceMock = new KsMediaServiceMock().setMediaAll(false);

		spectator = createDirective(
			`
				<div
					*ksMediaData="
						let mediaMobile = mediaMobile;
						let mediaDesktop = mediaMobile;
						let mediaMin = mediaMin;
						let mediaMax = mediaMax;
						let mediaBetween = mediaBetween;
						let mediaOnly = mediaOnly;
					"
				>
					Media mobile: {{ mediaMobile | async }}
					Media desktop: {{ mediaDesktop | async }}
					Media min: {{ mediaMin('md') | async }}
					Media max: {{ mediaMax('md') | async }}
					Media between: {{ mediaBetween(['md', 'xl']) | async }}
					Media only: {{ mediaOnly('md') | async }}
				</div>
			`,
			{ providers: [provideKsMediaServiceMock(mediaServiceMock)] }
		);

		expect(spectator.element).toHaveExactTrimmedText(
			'Media mobile: false Media desktop: false Media min: false Media max: false Media between: false Media only: false'
		);
	});
});
