import { Directive, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { MediaService } from '../../services';

import { MediaBreakpoint } from '../../interfaces';

@Directive({
	selector: '[mediaMin]',
	standalone: true,
})
export class MediaMinDirective {
	public readonly breakpoint = input.required<MediaBreakpoint>({ alias: 'mediaMin' });

	private readonly isMatched = toSignal(this.mediaService.mediaMin(this.breakpoint()));

	constructor(
		private readonly mediaService: MediaService,
		private readonly templateRef: TemplateRef<null>,
		private readonly viewContainerRef: ViewContainerRef
	) {
		this.isMatched() ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear();
	}
}
