import { YTPlayer } from '../classes/player';
import { Queue, queueManager } from '../classes/queue';
import { embeds } from '../embeds';
import { client } from '../index';
import { Message, VoiceBasedChannel } from 'discord.js';
import ytdl from 'ytdl-core';

let url: string;

export async function playCommand(message: Message) {
	let player = client?.player;
	if (!queueManager.getQueue(message.guild?.id as string)) {
		queueManager.setQueue(message.guild?.id as string, new Queue());
	}
	const queue = queueManager.getQueue(message.guild?.id as string) as Queue;
	if (!player) {
		client.player = new YTPlayer(
			message.guild?.id as string,
			message.member?.voice.channel as VoiceBasedChannel,
			message.channel.id
		);
		player = client.player;
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
