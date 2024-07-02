import { Directive, inject, TemplateRef, ViewContainerRef } from '@angular/core';

import { MediaService } from '../../services';

@Directive({
	selector: '[ksMediaData]',
	standalone: true,
})
export class MediaDataDirective {
	private readonly mediaService = inject(MediaService);
	private readonly templateRef = inject(TemplateRef<MediaService>);
	private readonly viewContainerRef = inject(ViewContainerRef);

	constructor() {
		this.viewContainerRef.createEmbeddedView(this.templateRef, this.mediaService);
	}

	public static ngTemplateContextGuard(_dir: MediaDataDirective, _ctx: unknown): _ctx is MediaService {
		return true;
	}
}
