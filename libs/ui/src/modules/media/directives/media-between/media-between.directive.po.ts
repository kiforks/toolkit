import { SpectatorDirective } from '@ngneat/spectator/jest';

export class MediaBetweenDirectivePO {
	constructor(private readonly _spectator: SpectatorDirective<unknown>) {}

	public get element(): HTMLElement {
		return this._spectator.element.querySelector('[test]') as HTMLElement;
	}

	public get elements(): NodeList {
		return this._spectator.element.querySelectorAll('[test]') as NodeList;
	}
}
