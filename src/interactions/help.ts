import { embeds } from '../embeds';
import { ChatInputCommandInteraction } from 'discord.js';

export async function helpCommand(interaction: ChatInputCommandInteraction) {
	interaction.reply(embeds.help);
}
