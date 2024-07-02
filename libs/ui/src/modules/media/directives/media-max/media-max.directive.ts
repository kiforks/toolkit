import { Directive, effect, input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { SubSink } from 'subsink';

import { MediaService } from '../../services';

import { MediaBreakpoint } from '../../interfaces';

@Directive({
	selector: '[ksMediaMax]',
	standalone: true,
})
export class MediaMaxDirective implements OnDestroy {
	public readonly breakpoint = input.required<MediaBreakpoint>({ alias: 'ksMediaMax' });

	private readonly subs = new SubSink();

	constructor(
		private readonly mediaService: MediaService,
		private readonly templateRef: TemplateRef<null>,
		private readonly viewContainerRef: ViewContainerRef
	) {
		effect(() => {
			this.subs.unsubscribe();

			this.subs.sink = this.mediaService
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
