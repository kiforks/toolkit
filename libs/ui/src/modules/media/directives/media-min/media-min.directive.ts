import { Directive, effect, input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { SubSink } from 'subsink';

import { KsMediaService } from '../../services';

import { KsMediaBreakpoint } from '../../interfaces';

@Directive({
	selector: '[ksMediaMin]',
	standalone: true,
})
export class KsMediaMinDirective implements OnDestroy {
	public readonly breakpoint = input.required<KsMediaBreakpoint>({ alias: 'ksMediaMin' });

	private subs = new SubSink();

	constructor(
		private readonly ksMediaService: KsMediaService,
		private readonly templateRef: TemplateRef<null>,
		private readonly viewContainerRef: ViewContainerRef
	) {
		effect(() => {
			this.subs.unsubscribe();

			this.subs.sink = this.ksMediaService
				.mediaMin(this.breakpoint())
				.subscribe(isMatched =>
					isMatched ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear()
				);
		});
	}

	public ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
}
