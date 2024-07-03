import { Directive, input } from '@angular/core';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';

import { ConditionKeywordDirective } from './condition-keyword.directive';

import { ConditionKeyword } from '../../interfaces';

import { CONDITION_KEYWORD } from '../../tokens';
import { ConditionKeywordPO } from './condition.keyword.po';

interface ConditionKeywordContextMock {
	$implicit: string;
}

const testTextContext = 'some value';

@Directive({
	selector: '[testConditionKeyword]',
	standalone: true,
	providers: [{ provide: CONDITION_KEYWORD, useExisting: TestConditionKeywordDirective }],
	hostDirectives: [
		{
			directive: ConditionKeywordDirective,
			inputs: [
				'ksConditionKeywordElse: testConditionKeywordElse',
				'ksConditionKeywordAnd: testConditionKeywordAnd',
				'ksConditionKeywordOr: testConditionKeywordOr',
			],
		},
	],
})
class TestConditionKeywordDirective implements ConditionKeyword {
	public readonly condition = input.required<boolean>({ alias: 'testConditionKeyword' });
	public readonly context: ConditionKeywordContextMock = { $implicit: testTextContext };
}

describe('ConditionKeywordDirective', () => {
	let spectator: SpectatorDirective<TestConditionKeywordDirective>;
	let directivePO: ConditionKeywordPO;

	const createDirective = createDirectiveFactory(TestConditionKeywordDirective);

	const validCondition = (po: ConditionKeywordPO): void => {
		expect(po.hostElement).toExist();
		expect(po.template).not.toExist();
	};

	const invalidCondition = (po: ConditionKeywordPO): void => {
		expect(po.hostElement).not.toExist();
		expect(po.template).toExist();
	};

	it('should render host directive with conditionals', () => {
		spectator = createDirective(
			`
				<div *testConditionKeyword="ifCondition; or: orCondition; and: andCondition; else: elseTemplateRef; let data" data-po="host-element">
					<span data-po="context-element">{{ data }}</span>
				</div>
				
				<ng-template #elseTemplateRef>
					<span data-po="else-template">Else template</span>
				</ng-template>
			`,
			{
				hostProps: { ifCondition: true, orCondition: false, andCondition: true },
			}
		);

		directivePO = new ConditionKeywordPO(spectator);

		spectator.detectChanges();

		validCondition(directivePO);

		expect(directivePO.contextElement).toHaveExactTrimmedText(testTextContext);

		spectator.setHostInput({
			ifCondition: false,
		});

		invalidCondition(directivePO);

		spectator.setHostInput({
			orCondition: true,
		});

		validCondition(directivePO);

		spectator.setHostInput({
			andCondition: false,
		});

		invalidCondition(directivePO);

		spectator.setHostInput({
			ifCondition: true,
		});

		invalidCondition(directivePO);

		spectator.setHostInput({
			andCondition: true,
		});

		validCondition(directivePO);
	});

	it('should render host directive without conditionals', () => {
		spectator = createDirective(
			`
				<div *testConditionKeyword="ifCondition; let data" data-po="host-element">
					<span data-po="context-element">{{ data }}</span>
				</div>
			`,
			{
				hostProps: { ifCondition: true },
			}
		);

		directivePO = new ConditionKeywordPO(spectator);

		spectator.detectChanges();

		expect(directivePO.hostElement).toExist();
		expect(directivePO.contextElement).toHaveExactTrimmedText(testTextContext);

		spectator.setHostInput({
			ifCondition: false,
		});

		expect(directivePO.hostElement).not.toExist();
	});
});
