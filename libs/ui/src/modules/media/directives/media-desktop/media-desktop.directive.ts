import { Directive, effect, inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { MediaService } from '../../services';

@Directive({
	selector: '[ksMediaDesktop]',
	standalone: true,
})
export class MediaDesktopDirective {
	private readonly mediaService = inject(MediaService);
	private readonly templateRef = inject(TemplateRef<null>);
	private readonly viewContainerRef = inject(ViewContainerRef);

	private readonly mediaDesktop = toSignal(this.mediaService.mediaDesktop);

	constructor() {
		effect(() =>
			this.mediaDesktop() ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear()
		);
	}
}
