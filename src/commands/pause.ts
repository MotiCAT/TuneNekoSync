import { AudioPlayer, AudioPlayerStatus } from '@discordjs/voice';
import { Message, EmbedBuilder } from 'discord.js';

export async function pauseCommand(message: Message, player: AudioPlayer) {
	if (player.state.status === AudioPlayerStatus.Playing) {
		player.pause();
		message.reply({
			embeds: [new EmbedBuilder().addFields({ name: 'Success', value: '動画を一時停止しました。' }).setColor('Green')]
		});
	} else if (player.state.status === AudioPlayerStatus.Paused) {
		player.unpause();
		message.reply({
			embeds: [new EmbedBuilder().addFields({ name: 'Success', value: '動画を再開しました。' }).setColor('Green')]
		});
	} else {
		message.reply({
			embeds: [new EmbedBuilder().addFields({ name: 'Info', value: '動画が再生されていません。' }).setColor('Yellow')]
		});
	}
}
