import { queueManager } from '../classes/queue';
import { player } from './play';
import { Message, EmbedBuilder } from 'discord.js';

export async function skipCommand(message: Message) {
	if (typeof player === 'undefined') return message.reply({ content: '動画が再生されていません。' });
	const queue = queueManager.queues.get(message.guildId!);

	if (!queue?.store.length) {
		return message.reply({
			embeds: [new EmbedBuilder().addFields({ name: 'Info', value: 'キューが空です。' }).setColor('Yellow')]
		});
	}
	player.skip();
}
