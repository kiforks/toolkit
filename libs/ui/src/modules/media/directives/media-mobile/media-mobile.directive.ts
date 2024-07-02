import { Directive, effect, inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { MediaService } from '../../services';

@Directive({
	selector: '[ksMediaMobile]',
	standalone: true,
})
export class MediaMobileDirective {
	private readonly mediaService = inject(MediaService);
	private readonly templateRef = inject(TemplateRef<null>);
	private readonly viewContainerRef = inject(ViewContainerRef);

	private readonly mediaMobile = toSignal(this.mediaService.mediaMobile);

	constructor() {
		effect(() =>
			this.mediaMobile() ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear()
		);
	}
}
