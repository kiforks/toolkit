import { DestroyRef, Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Breakpoint } from '@kiforks/core';

import { MediaService } from '../../services';

@Directive({
	selector: '[ksMediaOnly]',
	standalone: true,
})
export class MediaOnlyDirective {
	public readonly breakpoint = input.required<Breakpoint>({ alias: 'ksMediaOnly' });

	private readonly mediaService = inject(MediaService);
	private readonly templateRef = inject(TemplateRef<null>);
	private readonly viewContainerRef = inject(ViewContainerRef);
	private readonly destroyRef = inject(DestroyRef);

	constructor() {
		effect(() =>
			this.mediaService
				.mediaOnly(this.breakpoint())
				.pipe(takeUntilDestroyed(this.destroyRef))
				.subscribe(isMatched =>
					isMatched ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear()
				)
		);
	}
}
