import { Directive, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

import { MediaService } from '../../services';

import { MediaBetweenBreakpoints } from '../../interfaces';

@Directive({
	selector: '[ksMediaBetween]',
	standalone: true,
})
export class MediaBetweenDirective {
	public readonly fromToBreakpoints = input.required<MediaBetweenBreakpoints>({ alias: 'ksMediaBetween' });

	private readonly mediaService = inject(MediaService);
	private readonly templateRef = inject(TemplateRef<null>);
	private readonly viewContainerRef = inject(ViewContainerRef);

	private readonly fromToBreakpoints$ = toObservable(this.fromToBreakpoints);

	constructor() {
		this.fromToBreakpoints$
			.pipe(
				switchMap(breakpoints => this.mediaService.mediaBetween(breakpoints)),
				takeUntilDestroyed()
			)
			.subscribe(isMatched =>
				isMatched ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear()
			);
	}
}
