import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

import { MediaService } from '../../services';

@Directive({
	selector: '[ksMediaData]',
	standalone: true,
})
export class MediaDataDirective {
	private readonly context: MediaService = this.mediaService;

	constructor(
		private readonly mediaService: MediaService,
		private readonly templateRef: TemplateRef<MediaService>,
		private readonly viewContainerRef: ViewContainerRef
	) {
		this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
	}

	public static ngTemplateContextGuard(_dir: MediaDataDirective, _ctx: unknown): _ctx is MediaService {
		return true;
	}
}
