import { embeds } from '../embeds';
import { client } from '../index';
import { ChatInputCommandInteraction } from 'discord.js';

export async function skipCommand(interaction: ChatInputCommandInteraction) {
	const player = client?.player;
	if (!player) return interaction.reply(embeds.videoNotPlaying);
	player.skip();
	return interaction.reply(embeds.videoNext);
}
