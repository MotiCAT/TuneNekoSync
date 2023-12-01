import { songResolver } from '../Utils/songResolver';
import { Message } from 'discord.js';
import ytdl from 'ytdl-core';

export async function debugCommand(message: Message) {
	const url = message.content.split(' ')[1];
	if (!url) {
		return message.reply({ content: 'URLを指定してください。' });
	}
	if (!ytdl.validateURL(url)) {
		return message.reply({ content: '無効なURLです。' });
	}
	const info = await ytdl.getInfo(url);
	console.table(songResolver(info));
}
