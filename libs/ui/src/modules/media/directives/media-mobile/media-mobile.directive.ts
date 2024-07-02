import { Directive, inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MediaService } from '../../services';

@Directive({
	selector: '[ksMediaMobile]',
	standalone: true,
})
export class MediaMobileDirective {
	private readonly mediaService = inject(MediaService);
	private readonly templateRef = inject(TemplateRef<null>);
	private readonly viewContainerRef = inject(ViewContainerRef);

	constructor() {
		this.mediaService.mediaMobile
			.pipe(takeUntilDestroyed())
			.subscribe(isMatched =>
				isMatched ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear()
			);
	}
}
