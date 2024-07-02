import { Directive, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { Breakpoint } from '@kiforks/core';
import { switchMap } from 'rxjs';

import { MediaService } from '../../services';

@Directive({
	selector: '[ksMediaOnly]',
	standalone: true,
})
export class MediaOnlyDirective {
	public readonly breakpoint = input.required<Breakpoint>({ alias: 'ksMediaOnly' });

	private readonly mediaService = inject(MediaService);
	private readonly templateRef = inject(TemplateRef<null>);
	private readonly viewContainerRef = inject(ViewContainerRef);

	private readonly breakpoint$ = toObservable(this.breakpoint);

	constructor() {
		this.breakpoint$
			.pipe(
				switchMap(breakpoint => this.mediaService.mediaOnly(breakpoint)),
				takeUntilDestroyed()
			)
			.subscribe(isMatched =>
				isMatched ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear()
			);
	}
}
