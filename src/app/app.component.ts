import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [RouterModule],
	selector: '[appRoot]',
	templateUrl: './app.component.html',
})
export class AppComponent {
	public title = 'toolkit';
}
