import { Directive, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

import { MediaService } from '../../services';

import { MediaBreakpoint } from '../../interfaces';

@Directive({
	selector: '[ksMediaMin]',
	standalone: true,
})
export class MediaMinDirective {
	public readonly breakpoint = input.required<MediaBreakpoint>({ alias: 'ksMediaMin' });

	private readonly mediaService = inject(MediaService);
	private readonly templateRef = inject(TemplateRef<null>);
	private readonly viewContainerRef = inject(ViewContainerRef);

	private readonly breakpoint$ = toObservable(this.breakpoint);

	constructor() {
		this.breakpoint$
			.pipe(
				switchMap(breakpoint => this.mediaService.mediaMin(breakpoint)),
				takeUntilDestroyed()
			)
			.subscribe(isMatched =>
				isMatched ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear()
			);
	}
}
