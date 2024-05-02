import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

import { KsMediaService } from '../../services';

@Directive({
	selector: '[ksMediaData]',
	standalone: true,
})
export class KsMediaDataDirective {
	private readonly context: KsMediaService = this.ksMediaService;

	constructor(
		private readonly ksMediaService: KsMediaService,
		private readonly templateRef: TemplateRef<KsMediaService>,
		private readonly viewContainerRef: ViewContainerRef
	) {
		this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
	}

	public static ngTemplateContextGuard(_dir: KsMediaDataDirective, _ctx: unknown): _ctx is KsMediaService {
		return true;
	}
}
