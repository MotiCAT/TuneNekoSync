import { Builder } from '../Utils/Builder';
import { player } from './play';
import { AudioPlayerStatus } from '@discordjs/voice';
import { Message } from 'discord.js';

export async function resumeCommand(message: Message) {
	if (typeof player === 'undefined') return message.reply({ content: '動画が再生されていません。' });
	if (player.player.state.status === AudioPlayerStatus.Paused) {
		player.resume();
		message.reply(
			new Builder().addFields({ name: 'Success', value: '動画を再開しました。' }).setColor('Green').build()
		);
	} else if (player.player.state.status === AudioPlayerStatus.Playing) {
		message.reply(
			new Builder().addFields({ name: 'Info', value: '動画が一時停止されていません。' }).setColor('Yellow').build()
		);
	} else {
		message.reply(
			new Builder().addFields({ name: 'Info', value: '動画が再生されていません。' }).setColor('Yellow').build()
		);
	}
}
