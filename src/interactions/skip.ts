import { Queue, queueManager } from '../classes/queue';
import { embeds } from '../embeds';
import { client } from '../index';
import { ChatInputCommandInteraction } from 'discord.js';

export async function skipCommand(interaction: ChatInputCommandInteraction) {
	const player = client?.player;
	if (typeof player === 'undefined') return interaction.reply(embeds.videoNotPlaying);
	const queue = queueManager.queues.get(interaction.guildId!) as Queue;
	if (!queue.length) return interaction.reply(embeds.queueEmpty);
	player.skip();
}
