import { Directive, inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged } from 'rxjs/operators';

import { MEDIA_DEVICE } from '../../tokens/media.token';

/**
 * @private
 */
@Directive({
	selector: '[ksMediaDevice]',
	standalone: true,
})
export class MediaDeviceDirective {
	private readonly templateRef = inject(TemplateRef<null>);
	private readonly viewContainerRef = inject(ViewContainerRef);
	private readonly mediaDevice = inject(MEDIA_DEVICE);

	constructor() {
		this.mediaDevice.checkMedia
			.pipe(distinctUntilChanged(), takeUntilDestroyed())
			.subscribe(isMatched =>
				isMatched ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear()
			);
	}
}
