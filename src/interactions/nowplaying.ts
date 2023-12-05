import { getSongInfo } from '../Utils/songResolver';
import { queueManager, Queue } from '../classes/queue';
import { embeds } from '../embeds';
import { client } from '../index';
import { ChatInputCommandInteraction } from 'discord.js';

export async function nowplayingCommand(interaction: ChatInputCommandInteraction) {
	await interaction.deferReply();
	const player = client?.player;
	if (typeof player === 'undefined') return interaction.followUp(embeds.videoNotPlaying);
	const queue = queueManager.getQueue(interaction.guild?.id as string) as Queue;
	const info = await getSongInfo(queue.currentSong);
	return interaction.followUp(info);
}
