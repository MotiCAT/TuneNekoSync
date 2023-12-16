import { embeds } from '../embeds';
import { StringSelectMenuInteraction } from 'discord.js';

export async function helpmenuCommand(interaction: StringSelectMenuInteraction) {
	switch (interaction.values[0]) {
		case 'music':
			interaction.update(embeds.helpMusic);
			break;
		case 'misc':
			interaction.update(embeds.helpMisc);
			break;
		case 'search':
			interaction.update(embeds.helpSearch);
			break;
	}
}
