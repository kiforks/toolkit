import { Directive, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';

import { MediaService } from '../../services';

import { MediaBreakpoint } from '../../interfaces';

@Directive({
	selector: '[ksMediaMax]',
	standalone: true,
})
export class MediaMaxDirective {
	public readonly breakpoint = input.required<MediaBreakpoint>({ alias: 'ksMediaMax' });

	private readonly mediaService = inject(MediaService);
	private readonly templateRef = inject(TemplateRef<null>);
	private readonly viewContainerRef = inject(ViewContainerRef);

	private readonly breakpoint$ = toObservable(this.breakpoint);

	constructor() {
		this.breakpoint$
			.pipe(
				tap(() => this.viewContainerRef.clear()),
				switchMap(breakpoint => this.mediaService.mediaMax(breakpoint)),
				takeUntilDestroyed()
			)
			.subscribe(isMatched =>
				isMatched ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear()
			);
	}
}
