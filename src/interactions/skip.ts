import { Queue, queueManager } from '../classes/queue';
import { embeds } from '../embeds';
import { player } from './play';
import { ChatInputCommandInteraction } from 'discord.js';

export async function skipCommand(interaction: ChatInputCommandInteraction) {
	if (typeof player === 'undefined') return interaction.reply(embeds.videoNotPlaying);
	const queue = queueManager.queues.get(interaction.guildId!) as Queue;
	if (!queue.length) return interaction.reply(embeds.queueEmpty);
	player.skip();
}
