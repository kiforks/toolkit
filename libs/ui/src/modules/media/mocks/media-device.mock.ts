import { BehaviorSubject, Observable } from 'rxjs';

import { MediaDevice } from '../interfaces';

export class MediaDeviceMock implements MediaDevice {
	private readonly isMatched$ = new BehaviorSubject(true);

	public get checkMedia(): Observable<boolean> {
		return this.isMatched$;
	}

	public setCheckMedia(value: boolean): this {
		this.isMatched$.next(value);

		return this;
	}
}
