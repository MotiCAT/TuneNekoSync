import { Builder } from '../Utils/Builder';
import { songResolver } from '../Utils/songResolver';
import { Queue, queueManager } from '../classes/queue';
import { player } from './play';
import { Message } from 'discord.js';
import ytdl from 'ytdl-core';

export async function queueCommand(message: Message) {
	if (typeof player === 'undefined') return message.reply({ content: '動画が再生されていません。' });
	const queue = queueManager.getQueue(message.guildId!) as Queue;
	if (!queue.length) {
		return message.reply(
			new Builder().addFields({ name: 'Info', value: 'キューが空です。' }).setColor('Yellow').build()
		);
	}
	const embed = new Builder().setTitle('Queue').setColor('Blue').setTimestamp();
	for (let i = 0; i < queue.length; i++) {
		const url = queue.store[i];
		const info = await ytdl.getInfo(url);
		const song = songResolver(info, message.author.username, message.author.avatarURL()!);
		embed.addFields({
			name: `${i + 1}. ${song.title}`,
			value: `[${song.author}](${song.authorUrl})`
		});
		embed.setFooter({
			text: `Queue: ${queue.store.length} songs`
		});
	}
	message.reply(embed.build());
}
