import { Breakpoint } from '@kiforks/core';
import { Bind } from '@kiforks/utilities';
import { BehaviorSubject, Observable } from 'rxjs';

import { MediaService } from '../services';

import { MediaBetweenBreakpoints, MediaBreakpoint } from '../interfaces';

export class MediaServiceMock
	implements
		Pick<MediaService, 'mediaBetween' | 'mediaDesktop' | 'mediaMax' | 'mediaMin' | 'mediaMobile' | 'mediaOnly'>
{
	private readonly _mediaDesktop = new BehaviorSubject(true);
	private readonly _mediaMobile = new BehaviorSubject(false);
	private readonly _mediaMin = new BehaviorSubject(false);
	private readonly _mediaMax = new BehaviorSubject(false);
	private readonly _mediaBetween = new BehaviorSubject(false);
	private readonly _mediaOnly = new BehaviorSubject(false);

	public get mediaMobile(): Observable<boolean> {
		return this._mediaMobile;
	}

	public get mediaDesktop(): Observable<boolean> {
		return this._mediaDesktop;
	}

	public setAsMobile(): this {
		this._mediaMobile.next(true);
		this._mediaDesktop.next(false);

		return this;
	}

	public setAsDesktop(): this {
		this._mediaMobile.next(false);
		this._mediaDesktop.next(true);

		return this;
	}

	public setMediaMin(value: boolean): this {
		this._mediaMin.next(value);

		return this;
	}

	public setMediaMax(value: boolean): this {
		this._mediaMax.next(value);

		return this;
	}

	public setMediaBetween(value: boolean): this {
		this._mediaBetween.next(value);

		return this;
	}

	public setMediaOnly(value: boolean): this {
		this._mediaOnly.next(value);

		return this;
	}

	public setMediaAll(value: boolean): this {
		this.setMediaMin(value);
		this.setMediaMax(value);
		this.setMediaBetween(value);
		this.setMediaOnly(value);

		this._mediaMobile.next(value);
		this._mediaDesktop.next(value);

		return this;
	}

	@Bind public mediaMin(_breakpoint: MediaBreakpoint): Observable<boolean> {
		return this._mediaMin;
	}

	@Bind public mediaMax(_breakpoint: MediaBreakpoint): Observable<boolean> {
		return this._mediaMax;
	}

	@Bind public mediaBetween([_breakpointFrom, _breakpointTo]: MediaBetweenBreakpoints): Observable<boolean> {
		return this._mediaBetween;
	}

	@Bind public mediaOnly(_breakpoint: Breakpoint): Observable<boolean> {
		return this._mediaOnly;
	}
}
