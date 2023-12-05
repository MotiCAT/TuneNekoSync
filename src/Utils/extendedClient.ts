import { YTPlayer } from '../classes/player';
import { ClientOptions, Client } from 'discord.js';

export class extendedClient extends Client {
	player: YTPlayer | undefined;
	constructor(options: ClientOptions) {
		super(options);
		this.player = undefined;
	}
}
