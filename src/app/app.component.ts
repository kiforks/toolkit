import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { MediaBreakpoint, MediaMinDirective } from '@kiforks/ui';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	selector: '[appRoot]',
	templateUrl: './app.component.html',
	imports: [MediaMinDirective, AsyncPipe, JsonPipe],
})
export class AppComponent {
	public title = 'toolkit';

	public readonly ifCondition = signal(false);

	public readonly mediaMinValue = signal<MediaBreakpoint>('sm');

	constructor() {
		setInterval(() => {
			this.ifCondition.set(!this.ifCondition());
		}, 5000);
	}
}
