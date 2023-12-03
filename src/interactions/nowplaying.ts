import { getSongInfo } from '../Utils/songResolver';
import { queueManager, Queue } from '../classes/queue';
import { embeds } from '../embeds';
import { player } from './play';
import { ChatInputCommandInteraction } from 'discord.js';

export async function nowplayingCommand(interaction: ChatInputCommandInteraction) {
	if (typeof player === 'undefined') return interaction.reply(embeds.videoNotPlaying);
	const queue = queueManager.getQueue(interaction.guild?.id as string) as Queue;
	if (!queue.currentSong) return interaction.reply(embeds.queueEmpty);
	const info = await getSongInfo(queue.currentSong);
	return interaction.reply(info);
}
