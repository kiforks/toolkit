import { Directive, inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, switchMap, tap } from 'rxjs';

import { MEDIA_ELEMENT } from '../../tokens';

/**
 * @private
 */
@Directive({
	selector: '[ksMediaBase]',
	standalone: true,
})
export class MediaBaseDirective {
	private readonly templateRef = inject(TemplateRef<null>);
	private readonly viewContainerRef = inject(ViewContainerRef);
	private readonly mediaElement = inject(MEDIA_ELEMENT);

	private readonly breakpoint$ = toObservable(this.mediaElement.breakpoint);

	constructor() {
		this.breakpoint$
			.pipe(
				tap(() => this.viewContainerRef.clear()),
				switchMap(breakpoint => this.mediaElement.checkMedia(breakpoint)),
				distinctUntilChanged(),
				takeUntilDestroyed()
			)
			.subscribe(isMatched =>
				isMatched ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear()
			);
	}
}
