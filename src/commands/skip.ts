import { Queue, queueManager } from '../classes/queue';
import { embeds } from '../embeds';
import { player } from './play';
import { Message } from 'discord.js';

export async function skipCommand(message: Message) {
	if (typeof player === 'undefined') return message.reply(embeds.videoNotPlaying);
	const queue = queueManager.queues.get(message.guildId!) as Queue;
	if (!queue.length) return message.reply(embeds.queueEmpty);
	player.skip();
}
