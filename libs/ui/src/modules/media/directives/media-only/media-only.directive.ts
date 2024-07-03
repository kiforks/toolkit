import { Directive, inject, input, signal } from '@angular/core';
import { Breakpoint } from '@kiforks/core';

import { MediaService } from '../../services';

import { MediaBaseDirective } from '../media-base/media-base.directive';

import { MediaElement } from '../../interfaces';

import { CONDITION_KEYWORD, ConditionKeyword, ConditionKeywordDirective } from '../../../condition';
import { MEDIA_ELEMENT } from '../../tokens';

/**
 * The `MediaOnlyDirective` is designed to handle media queries that target specific breakpoints (e.g., `only`).
 * It uses the `MediaBaseDirective` as a host directive to leverage its logic for media query handling.
 * Additionally, it incorporates `ConditionKeywordDirective` for conditional rendering based on logical conditions.
 *
 * This directive is intended for responsive design, allowing content to be displayed only at a specific screen size.
 *
 * Example usage in the DOM:
 * ```html
 * <div *ksMediaOnly="'md'">
 *   This content will only be displayed for the 'md' breakpoint.
 * </div>
 * ```
 *
 * Usage with conditions in the DOM:
 * ```html
 * <div *ksMediaOnly="'md'; or true; and false; else templateRef">
 *   This content will only be displayed for the 'md' breakpoint
 *   or if the specified conditions are met.
 * </div>
 *
 * <ng-template #templateRef>
 *   This content will be displayed if the conditions are not met.
 * </ng-template>
 * ```
 *
 * The directive mirrors the functionality of the "media-only" SCSS mixin:
 * @see libs/ui/scss/utilities/media/mixins/_media-only.scss
 */
@Directive({
	selector: '[ksMediaOnly]',
	standalone: true,
	providers: [
		{ provide: MEDIA_ELEMENT, useExisting: MediaOnlyDirective },
		{ provide: CONDITION_KEYWORD, useExisting: MediaOnlyDirective },
	],
	hostDirectives: [
		MediaBaseDirective,
		{
			directive: ConditionKeywordDirective,
			inputs: [
				'ksConditionKeywordAnd: ksMediaOnlyAnd',
				'ksConditionKeywordElse: ksMediaOnlyElse',
				'ksConditionKeywordOr: ksMediaOnlyOr',
			],
		},
	],
})
export class MediaOnlyDirective implements MediaElement<Breakpoint>, ConditionKeyword {
	public readonly breakpoint = input.required<Breakpoint>({ alias: 'ksMediaOnly' });

	public readonly condition = signal(false);

	// eslint-disable-next-line @typescript-eslint/unbound-method
	public readonly checkMedia = inject(MediaService).mediaOnly;
}
