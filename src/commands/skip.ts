import { Builder } from '../Utils/Builder';
import { Queue, queueManager } from '../classes/queue';
import { player } from './play';
import { Message } from 'discord.js';

export async function skipCommand(message: Message) {
	if (typeof player === 'undefined') return message.reply({ content: '動画が再生されていません。' });
	const queue = queueManager.queues.get(message.guildId!) as Queue;

	if (!queue.length) {
		return message.reply(
			new Builder().addFields({ name: 'Info', value: 'キューが空です。' }).setColor('Yellow').build()
		);
	}
	player.skip();
}
