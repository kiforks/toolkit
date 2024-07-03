import { SpectatorDirective } from '@ngneat/spectator/jest';

export class MediaOnlyDirectivePo {
	constructor(private readonly _spectator: SpectatorDirective<unknown>) {}

	public get element(): HTMLElement {
		return this._spectator.element.querySelector('[data-po="element"]') as HTMLElement;
	}

	public get elements(): NodeList {
		return this._spectator.element.querySelectorAll('[data-po="element"]') as NodeList;
	}

	public get template(): HTMLElement {
		return this._spectator.element.querySelector('[data-po="template"]') as HTMLElement;
	}
}
