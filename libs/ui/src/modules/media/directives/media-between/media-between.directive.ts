import { DestroyRef, Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MediaService } from '../../services';

import { MediaBetweenBreakpoints } from '../../interfaces';

@Directive({
	selector: '[ksMediaBetween]',
	standalone: true,
})
export class MediaBetweenDirective {
	public readonly fromToBreakpoints = input.required<MediaBetweenBreakpoints>({ alias: 'ksMediaBetween' });

	private readonly mediaService = inject(MediaService);
	private readonly templateRef = inject(TemplateRef<null>);
	private readonly viewContainerRef = inject(ViewContainerRef);
	private readonly destroyRef = inject(DestroyRef);

	constructor() {
		effect(() =>
			this.mediaService
				.mediaBetween(this.fromToBreakpoints())
				.pipe(takeUntilDestroyed(this.destroyRef))
				.subscribe(isMatched =>
					isMatched ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear()
				)
		);
	}
}
