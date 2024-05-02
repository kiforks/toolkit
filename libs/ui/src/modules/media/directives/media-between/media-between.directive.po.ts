import { SpectatorDirective } from '@ngneat/spectator/jest';

export class MediaBetweenDirectivePO {
	constructor(private readonly _spectator: SpectatorDirective<unknown>) {}

	public get element(): HTMLElement {
		return this._spectator.query('[test]') as HTMLElement;
	}
}
