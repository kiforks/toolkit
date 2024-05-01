import { BehaviorSubject } from 'rxjs';

export class MediaServiceMock {
	public isMobile = false;

	public mediaMobile = new BehaviorSubject(false);
	public mediaDesktop = new BehaviorSubject(true);

	public setAsMobile(): this {
		this.isMobile = true;
		this.mediaMobile.next(true);
		this.mediaDesktop.next(false);

		return this;
	}

	public setAsDesktop(): this {
		this.isMobile = false;
		this.mediaMobile.next(false);
		this.mediaDesktop.next(true);

		return this;
	}
}
