import { DestroyRef, Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MediaService } from '../../services';

import { MediaBreakpoint } from '../../interfaces';

@Directive({
	selector: '[ksMediaMax]',
	standalone: true,
})
export class MediaMaxDirective {
	public readonly breakpoint = input.required<MediaBreakpoint>({ alias: 'ksMediaMax' });

	private readonly mediaService = inject(MediaService);
	private readonly templateRef = inject(TemplateRef<null>);
	private readonly viewContainerRef = inject(ViewContainerRef);
	private readonly destroyRef = inject(DestroyRef);

	constructor() {
		effect(() =>
			this.mediaService
				.mediaMax(this.breakpoint())
				.pipe(takeUntilDestroyed(this.destroyRef))
				.subscribe(isMatched =>
					isMatched ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear()
				)
		);
	}
}
