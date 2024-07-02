import { Directive, effect, input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { SubSink } from 'subsink';

import { MediaService } from '../../services';

import { MediaBetweenBreakpoints } from '../../interfaces';

@Directive({
	selector: '[ksMediaBetween]',
	standalone: true,
})
export class MediaBetweenDirective implements OnDestroy {
	public readonly fromToBreakpoints = input.required<MediaBetweenBreakpoints>({ alias: 'ksMediaBetween' });

	private readonly subs = new SubSink();

	constructor(
		private readonly mediaService: MediaService,
		private readonly templateRef: TemplateRef<null>,
		private readonly viewContainerRef: ViewContainerRef
	) {
		effect(() => {
			this.subs.unsubscribe();

			this.subs.sink = this.mediaService
				.mediaBetween(this.fromToBreakpoints())
				.subscribe(isMatched =>
					isMatched ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear()
				);
		});
	}

	public ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
}
