import { YTPlayer } from '../classes/player';
import { Queue, queueManager } from '../classes/queue';
import { embeds } from '../embeds';
import { Message, VoiceBasedChannel } from 'discord.js';
import ytdl from 'ytdl-core';

export let player: YTPlayer | undefined;

export let url: string;

export async function playCommand(message: Message) {
	if (typeof queueManager.getQueue(message.guild?.id as string) === 'undefined') {
		queueManager.setQueue(message.guild?.id as string, new Queue());
	}
	const queue = queueManager.getQueue(message.guild?.id as string) as Queue;
	if (typeof player === 'undefined') {
		player = new YTPlayer(
			message.guild?.id as string,
			message.member?.voice.channel as VoiceBasedChannel,
			message.channel.id
		);
	}
	url = message.content.split(' ')[1];
	if (!url) return message.reply(embeds.noUrl);
	if (!ytdl.validateURL(url)) return message.reply(embeds.invaildUrl);

	if (!queue.length || !player.isPlaying) {
		queue.addSong(url);
		const info = await ytdl.getInfo(url);
		message.reply(
			new embeds.embed()
				.setTitle('Success')
				.setDescription(`**[${info.videoDetails.title}](${info.videoDetails.video_url})を再生します。**`)
				.addFields({
					name: info.videoDetails.title,
					value: `投稿者: [${info.videoDetails.author.name}](${info.videoDetails.author.channel_url})`
				})
				.setImage(info.videoDetails.thumbnails[0].url.split('?')[0])
				.setColor('Green')
				.build()
		);
		if (queue.length === 1) return player.play();
	} else {
		queue.addSong(url);
		const info = await ytdl.getInfo(url);
		message.reply(
			new embeds.embed()
				.setTitle('Info')
				.setDescription(`**[${info.videoDetails.title}](${info.videoDetails.video_url})をキューに追加しました。**`)
				.addFields({
					name: info.videoDetails.title,
					value: `投稿者: [${info.videoDetails.author.name}](${info.videoDetails.author.channel_url})`
				})
				.setImage(info.videoDetails.thumbnails[0].url.split('?')[0])
				.setColor('Yellow')
				.build()
		);
	}
}
