import { YTPlayer } from '../classes/player';
import { Queue, queueManager } from '../classes/queue';
import { Message, EmbedBuilder, ChannelType, VoiceBasedChannel } from 'discord.js';
import ytdl from 'ytdl-core';

export let player: YTPlayer | undefined;

export let url: string;

export async function playCommand(message: Message) {
	if (typeof queueManager.getQueue(message.guild?.id as string) === 'undefined') {
		queueManager.setQueue(message.guild?.id as string, new Queue());
	}
	const queue = queueManager.getQueue(message.guild?.id as string)?.store as string[];

	player = new YTPlayer(message.guild?.id as string, message.member?.voice.channel as VoiceBasedChannel);
	url = message.content.split(' ')[1];
	const channel = message.member?.voice.channel;
	if (!url)
		return message.reply({
			embeds: [new EmbedBuilder().addFields({ name: 'Error', value: 'URLを指定してください' }).setColor('Red')]
		});

	if (!ytdl.validateURL(url))
		return message.reply({
			embeds: [new EmbedBuilder().addFields({ name: 'Error', value: '無効なURLです。' }).setColor('Red')]
		});

	if (!channel)
		return message.reply({
			embeds: [
				new EmbedBuilder()
					.addFields({ name: 'Error', value: 'ボイスチャンネルに参加してから実行してください。' })
					.setColor('Red')
			]
		});

	if (channel.type !== ChannelType.GuildVoice) return;
	if (!channel.joinable)
		return message.reply({
			embeds: [
				new EmbedBuilder().addFields({ name: 'Error', value: 'このチャンネルに参加できません。' }).setColor('Red')
			]
		});

	if (!channel.speakable)
		return message.reply({
			embeds: [new EmbedBuilder().addFields({ name: 'Error', value: 'このチャンネルで喋れません。' }).setColor('Red')]
		});

	if (!queue.length || player.isPlaying) {
		queue.push(url);
		const info = await ytdl.getInfo(url);
		message.reply({
			embeds: [
				new EmbedBuilder()
					.setTitle('Success')
					.setDescription(`**[${info.videoDetails.title}](${info.videoDetails.video_url})を再生します。**`)
					.addFields({
						name: info.videoDetails.title,
						value: `投稿者: [${info.videoDetails.author.name}](${info.videoDetails.author.channel_url})`
					})
					.setImage(info.videoDetails.thumbnails[0].url.split('?')[0])
					.setColor('Green')
			]
		});
		if (queue.length === 1) return player.play();
	} else {
		queue.push(url);
		const info = await ytdl.getInfo(url);
		message.reply({
			embeds: [
				new EmbedBuilder()
					.setTitle('Info')
					.setDescription(`**[${info.videoDetails.title}](${info.videoDetails.video_url})キューに追加しました。**`)
					.addFields({
						name: info.videoDetails.title,
						value: `投稿者: [${info.videoDetails.author.name}](${info.videoDetails.author.channel_url})`
					})
					.setImage(info.videoDetails.thumbnails[0].url.split('?')[0])
					.setColor('Yellow')
			]
		});
	}
}
