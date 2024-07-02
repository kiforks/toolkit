import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MediaBreakpoint, MediaDesktopDirective, MediaMinDirective } from '@kiforks/ui';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [RouterModule, MediaMinDirective, MediaDesktopDirective],
	selector: '[appRoot]',
	templateUrl: './app.component.html',
})
export class AppComponent {
	public title = 'toolkit';

	public readonly mediaMinValue = signal<MediaBreakpoint>('sm');

	constructor() {
		setTimeout(() => {
			this.mediaMinValue.set('lg');
		}, 5000);

		setTimeout(() => {
			this.mediaMinValue.set('xxl');
		}, 10000);
	}
}
