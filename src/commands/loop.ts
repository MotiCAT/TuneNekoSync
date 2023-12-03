import { Builder } from '../Utils/Builder';
import { queueManager, Queue } from '../classes/queue';
import { player } from './play';
import { Message } from 'discord.js';

export async function loopCommand(message: Message, args: string[]) {
	if (typeof player === 'undefined') return message.reply({ content: '動画が再生されていません。' });
	const queue = queueManager.queues.get(message.guildId!) as Queue;
	args = args.filter((arg) => arg !== '');
	if (args.length === 0) {
		queue.loop === 'none' ? queue.setLoop('queue') : queue.setLoop('none');
	} else if (args.length === 1) {
		switch (args[0]) {
			case 'none':
				queue?.setLoop('none');
				break;
			case 'queue':
				queue?.setLoop('queue');
				break;
			case 'track':
				queue?.setLoop('track');
				break;
			default:
				message.reply(
					new Builder().addFields({ name: 'Error', value: 'コマンドが見つかりませんでした。' }).setColor('Red').build()
				);
				break;
		}
	}

	message.reply(new Builder().addFields({ name: 'Looping', value: queue.loop! }).setColor('Green').build());
}
