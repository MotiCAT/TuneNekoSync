import { Builder } from '../Utils/Builder';
import { YTPlayer } from '../classes/player';
import { Queue, queueManager } from '../classes/queue';
import { Message, ChannelType, VoiceBasedChannel } from 'discord.js';
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
	const channel = message.member?.voice.channel;
	if (!url)
		return message.reply(
			new Builder().addFields({ name: 'Error', value: 'URLを指定してください' }).setColor('Red').build()
		);

	if (!ytdl.validateURL(url))
		return message.reply(new Builder().addFields({ name: 'Error', value: '無効なURLです。' }).setColor('Red').build());

	if (!channel)
		return message.reply(
			new Builder()
				.addFields({ name: 'Error', value: 'ボイスチャンネルに参加してから実行してください。' })
				.setColor('Red')
				.build()
		);

	if (channel.type !== ChannelType.GuildVoice) return;
	if (!channel.joinable)
		return message.reply(
			new Builder().addFields({ name: 'Error', value: 'このチャンネルに参加できません。' }).setColor('Red').build()
		);

	if (!channel.speakable)
		return message.reply(
			new Builder().addFields({ name: 'Error', value: 'このチャンネルで喋れません。' }).setColor('Red').build()
		);

	if (!queue.length || !player.isPlaying) {
		queue.addSong(url);
		const info = await ytdl.getInfo(url);
		message.reply(
			new Builder()
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
			new Builder()
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
