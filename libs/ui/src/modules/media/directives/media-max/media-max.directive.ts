import { Directive, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { MediaService } from '../../services';

import { MediaBreakpoint } from '../../interfaces';

@Directive({
	selector: '[ksMediaMax]',
	standalone: true,
})
export class MediaMaxDirective {
	public readonly breakpoint = input.required<MediaBreakpoint>({ alias: 'mediaMax' });

	private readonly isMatched = toSignal(this.mediaService.mediaMax(this.breakpoint()));

	constructor(
		private readonly mediaService: MediaService,
		private readonly templateRef: TemplateRef<null>,
		private readonly viewContainerRef: ViewContainerRef
	) {
		this.isMatched() ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear();
	}
}
