import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

import { MediaService } from '../../services';

import { MediaDataContext } from '../../interfaces';

@Directive({
	selector: '[ksMediaData]',
	standalone: true,
})
export class MediaDataDirective {
	private readonly context: MediaDataContext = this.mediaService;

	constructor(
		private readonly mediaService: MediaService,
		private readonly templateRef: TemplateRef<MediaDataContext>,
		private readonly viewContainerRef: ViewContainerRef
	) {
		this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
	}

	public static ngTemplateContextGuard(_dir: MediaDataDirective, _ctx: unknown): _ctx is MediaDataContext {
		return true;
	}
}
