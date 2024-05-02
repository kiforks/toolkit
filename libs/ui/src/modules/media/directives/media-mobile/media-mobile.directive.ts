import { Directive, effect, TemplateRef, ViewContainerRef } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { KsMediaService } from '../../services';

@Directive({
	selector: '[ksMediaMobile]',
	standalone: true,
})
export class KsMediaMobileDirective {
	private readonly mediaMobile = toSignal(this.ksMediaService.mediaMobile);

	constructor(
		private readonly ksMediaService: KsMediaService,
		private readonly templateRef: TemplateRef<null>,
		private readonly viewContainerRef: ViewContainerRef
	) {
		effect(() =>
			this.mediaMobile() ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear()
		);
	}
}
