import { EmbedBuilder } from 'discord.js';

export class Builder extends EmbedBuilder {
	constructor() {
		super();
	}

	public build() {
		return { embeds: [this] };
	}

	public addEmbeds(embeds: Builder[]) {
		return { embeds: [this, ...embeds] };
	}
}
