import { songResolver } from '../Utils/songResolver';
import { Queue, queueManager } from '../classes/queue';
import { embeds } from '../embeds';
import { player } from './play';
import { ChatInputCommandInteraction } from 'discord.js';
import ytdl from 'ytdl-core';

export async function queueCommand(interaction: ChatInputCommandInteraction) {
	await interaction.deferReply();
	if (typeof player === 'undefined') return interaction.followUp(embeds.videoNotPlaying);
	const queue = queueManager.getQueue(interaction.guildId!) as Queue;
	if (!queue.length) return interaction.followUp(embeds.queueEmpty);

	const embed = new embeds.embed().setTitle('Queue').setColor('Blue').setTimestamp();
	for (let i = 0; i < queue.length; i++) {
		const url = queue.store[i];
		const info = await ytdl.getInfo(url);
		const song = songResolver(info, interaction.user.username, interaction.user.displayAvatarURL()!);
		embed.addFields({
			name: `${i + 1}. ${song.title}`,
			value: `[${song.author}](${song.authorUrl})`
		});
		embed.setFooter({
			text: `Queue: ${queue.store.length} songs`
		});
	}
	interaction.followUp(embed.build());
}
