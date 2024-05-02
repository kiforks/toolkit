import { Directive, effect, input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { SubSink } from 'subsink';

import { KsMediaService } from '../../services';

import { KsMediaBetweenBreakpoints } from '../../interfaces';

@Directive({
	selector: '[ksMediaBetween]',
	standalone: true,
})
export class KsMediaBetweenDirective implements OnDestroy {
	public readonly fromToBreakpoints = input.required<KsMediaBetweenBreakpoints>({ alias: 'ksMediaBetween' });

	private subs = new SubSink();

	constructor(
		private readonly ksMediaService: KsMediaService,
		private readonly templateRef: TemplateRef<null>,
		private readonly viewContainerRef: ViewContainerRef
	) {
		effect(() => {
			this.subs.unsubscribe();

			this.subs.sink = this.ksMediaService
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
