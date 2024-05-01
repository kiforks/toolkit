import { Directive, effect, TemplateRef, ViewContainerRef } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { MediaService } from '../../services';

@Directive({
	selector: '[ksMediaMobile]',
	standalone: true,
})
export class MediaMobileDirective {
	private readonly mediaMobile = toSignal(this.mediaService.mediaMobile);

	constructor(
		private readonly mediaService: MediaService,
		private readonly templateRef: TemplateRef<null>,
		private readonly viewContainerRef: ViewContainerRef
	) {
		effect(() =>
			this.mediaMobile() ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear()
		);
	}
}
