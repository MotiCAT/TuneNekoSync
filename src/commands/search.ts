import { embeds } from '../embeds';
import { Message, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } from 'discord.js';
import ytsr from 'youtube-sr';

export async function searchCommand(message: Message) {
	const videos = await ytsr.search(message.content.split(' ').slice(1).join(' '), {
		type: 'video'
	});

	if (!videos.length) return message.reply(embeds.noResult);

	const menu = new StringSelectMenuBuilder()
		.setCustomId('search')
		.setPlaceholder('Select a video')
		.addOptions(
			videos.map((video, index) =>
				new StringSelectMenuOptionBuilder()
					.setLabel(`${index + 1}. ${video.title}`)
					.setValue(video.url)
					.setDescription(String(video.durationFormatted))
					.setEmoji('🎵')
			)
		);

	const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(menu);

	message.reply({ content: 'Select a video', components: [row] });
}
