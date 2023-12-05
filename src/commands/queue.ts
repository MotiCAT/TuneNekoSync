import { songResolver } from '../Utils/songResolver';
import { Queue, queueManager } from '../classes/queue';
import { embeds } from '../embeds';
import { client } from '../index';
import { Message } from 'discord.js';
import ytdl from 'ytdl-core';

export async function queueCommand(message: Message) {
	const player = client?.player;
	if (typeof player === 'undefined') return message.reply(embeds.videoNotPlaying);
	const queue = queueManager.getQueue(message.guildId!) as Queue;

	const embed = new embeds.embed().setTitle('Queue').setColor('Blue').setTimestamp();
	for (let i = 0; i < queue.length; i++) {
		const url = queue.store[i];
		const info = await ytdl.getInfo(url);
		const song = songResolver(info, message.author.username, message.author.displayAvatarURL()!);
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
