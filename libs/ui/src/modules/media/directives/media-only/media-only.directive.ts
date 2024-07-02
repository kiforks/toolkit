import { Directive, effect, input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Breakpoint } from '@kiforks/core';
import { SubSink } from 'subsink';

import { MediaService } from '../../services';

@Directive({
	selector: '[ksMediaOnly]',
	standalone: true,
})
export class MediaOnlyDirective implements OnDestroy {
	public readonly breakpoint = input.required<Breakpoint>({ alias: 'ksMediaOnly' });

	private readonly subs = new SubSink();

	constructor(
		private readonly mediaService: MediaService,
		private readonly templateRef: TemplateRef<null>,
		private readonly viewContainerRef: ViewContainerRef
	) {
		effect(() => {
			this.subs.unsubscribe();

			this.subs.sink = this.mediaService
				.mediaOnly(this.breakpoint())
				.subscribe(isMatched =>
					isMatched ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear()
				);
		});
	}

	public ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
}
