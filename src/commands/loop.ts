import { queueManager } from '../classes/queue';
import { player } from './play';
import { Message, EmbedBuilder } from 'discord.js';

export async function loopCommand(message: Message, args: string[]) {
	if (typeof player === 'undefined') return message.reply({ content: '動画が再生されていません。' });
	const queue = queueManager.queues.get(message.guildId!);
	args = args.filter((arg) => arg !== '');
	if (args.length === 0) {
		queue?.loop === 'none' ? queue?.setLoop('queue') : queue?.setLoop('none');
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
				message.reply({
					embeds: [
						new EmbedBuilder().addFields({ name: 'Error', value: 'コマンドが見つかりませんでした。' }).setColor('Red')
					]
				});
				break;
		}
	}

	message.reply({
		embeds: [new EmbedBuilder().addFields({ name: 'Looping', value: queue?.loop! }).setColor('Green')]
	});
}
