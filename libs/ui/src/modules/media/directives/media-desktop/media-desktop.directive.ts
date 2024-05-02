import { Directive, effect, TemplateRef, ViewContainerRef } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { KsMediaService } from '../../services';

@Directive({
	selector: '[ksMediaDesktop]',
	standalone: true,
})
export class KsMediaDesktopDirective {
	private readonly mediaDesktop = toSignal(this.ksMediaService.mediaDesktop);

	constructor(
		private readonly ksMediaService: KsMediaService,
		private readonly templateRef: TemplateRef<null>,
		private readonly viewContainerRef: ViewContainerRef
	) {
		effect(() =>
			this.mediaDesktop() ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear()
		);
	}
}
