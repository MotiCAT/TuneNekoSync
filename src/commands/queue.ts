import { songResolver } from '../Utils/songResolver';
import { queueManager } from '../classes/queue';
import { player } from './play';
import { Message, EmbedBuilder } from 'discord.js';
import ytdl from 'ytdl-core';

export async function queueCommand(message: Message) {
	if (typeof player === 'undefined') return message.reply({ content: '動画が再生されていません。' });
	const queue = queueManager.getQueue(message.guildId!);
	if (!queue?.store.length) {
		return message.reply({
			embeds: [new EmbedBuilder().addFields({ name: 'Info', value: 'キューが空です。' }).setColor('Yellow')]
		});
	}
	const embed = new EmbedBuilder().setTitle('Queue').setColor('Blue').setTimestamp();
	for (let i = 0; i < queue.store.length; i++) {
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
	message.reply({ embeds: [embed] });
}
