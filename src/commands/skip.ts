import { Queue, queueManager } from '../classes/queue';
import { embeds } from '../embeds';
import { client } from '../index';
import { Message } from 'discord.js';

export async function skipCommand(message: Message) {
	const player = client?.player;
	if (typeof player === 'undefined') return message.reply(embeds.videoNotPlaying);
	const queue = queueManager.queues.get(message.guildId!) as Queue;
	if (!queue.length) return message.reply(embeds.queueEmpty);
	player.skip();
}
