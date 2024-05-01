import { Directive, effect, TemplateRef, ViewContainerRef } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { MediaService } from '../../services';

@Directive({
	selector: '[ksMediaDesktop]',
	standalone: true,
})
export class MediaDesktopDirective {
	private readonly mediaDesktop = toSignal(this.mediaService.mediaDesktop);

	constructor(
		private readonly mediaService: MediaService,
		private readonly templateRef: TemplateRef<null>,
		private readonly viewContainerRef: ViewContainerRef
	) {
		effect(() =>
			this.mediaDesktop() ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear()
		);
	}
}
