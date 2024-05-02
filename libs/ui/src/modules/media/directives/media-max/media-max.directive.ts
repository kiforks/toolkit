import { Directive, effect, input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { SubSink } from 'subsink';

import { KsMediaService } from '../../services';

import { KsMediaBreakpoint } from '../../interfaces';

@Directive({
	selector: '[ksMediaMax]',
	standalone: true,
})
export class KsMediaMaxDirective implements OnDestroy {
	public readonly breakpoint = input.required<KsMediaBreakpoint>({ alias: 'ksMediaMax' });

	private subs = new SubSink();

	constructor(
		private readonly ksMediaService: KsMediaService,
		private readonly templateRef: TemplateRef<null>,
		private readonly viewContainerRef: ViewContainerRef
	) {
		effect(() => {
			this.subs.unsubscribe();

			this.subs.sink = this.ksMediaService
				.mediaMax(this.breakpoint())
				.subscribe(isMatched =>
					isMatched ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear()
				);
		});
	}

	public ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
}
