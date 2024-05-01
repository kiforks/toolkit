import { Directive, effect, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Breakpoint } from '@kiforks/utilities';

import { MediaService } from '../../services';

@Directive({
	selector: '[mediaOnly]',
	standalone: true,
})
export class MediaOnlyDirective {
	public readonly breakpoint = input.required<Breakpoint>();

	private readonly isMatched = toSignal(this.mediaService.mediaOnly(this.breakpoint()));

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
