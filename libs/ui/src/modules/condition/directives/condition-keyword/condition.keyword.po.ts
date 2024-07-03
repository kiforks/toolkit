import { SpectatorDirective } from '@ngneat/spectator/jest';

export class ConditionKeywordPO {
	constructor(private readonly _spectator: SpectatorDirective<unknown>) {}

	public get template(): HTMLElement {
		return this._spectator.query("[data-po='else-template']") as HTMLElement;
	}

	public get contextElement(): HTMLElement {
		return this._spectator.query("[data-po='context-element']") as HTMLElement;
	}

	public get hostElement(): HTMLElement {
		return this._spectator.query("[data-po='host-element']") as HTMLElement;
	}
}
