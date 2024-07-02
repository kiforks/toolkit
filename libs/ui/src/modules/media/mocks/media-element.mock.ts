import { Injector, input, runInInjectionContext } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { MediaBreakpoint, MediaElement } from '../interfaces';

export class MediaElementMock implements MediaElement {
	public readonly breakpoint = runInInjectionContext(Injector.create({ providers: [] }), () =>
		input<MediaBreakpoint>('md')
	);

	private readonly isMatched$ = new BehaviorSubject(true);

	public readonly checkMedia = (_breakpoint: MediaBreakpoint): Observable<boolean> => this.isMatched$;

	public setCheckMedia(value: boolean): this {
		this.isMatched$.next(value);

		return this;
	}
}
