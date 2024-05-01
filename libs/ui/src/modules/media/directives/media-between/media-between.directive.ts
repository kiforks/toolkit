import { Directive, effect, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { MediaService } from '../../services';

import { MediaBetweenBreakpoints } from '../../interfaces';

@Directive({
	selector: '[ksMediaBetween]',
	standalone: true,
})
export class MediaBetweenDirective {
	public readonly fromToBreakpoints = input.required<MediaBetweenBreakpoints>({ alias: 'mediaBetween' });

	private readonly isMatched = toSignal(this.mediaService.mediaBetween(this.fromToBreakpoints()));

	constructor(
		private readonly mediaService: MediaService,
		private readonly templateRef: TemplateRef<null>,
		private readonly viewContainerRef: ViewContainerRef
	) {
		effect(() =>
			this.isMatched() ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear()
		);
	}
}
