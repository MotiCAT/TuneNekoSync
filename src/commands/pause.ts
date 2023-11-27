import { AudioPlayer, AudioPlayerStatus } from '@discordjs/voice';
import { Message, EmbedBuilder } from 'discord.js';

export async function pauseCommand(message: Message, player: AudioPlayer) {
	if (player.state.status === AudioPlayerStatus.Playing) {
		player.pause();
		message.reply({
			embeds: [new EmbedBuilder().addFields({ name: 'Success', value: '動画を一時停止しました。' }).setColor('Green')]
		});
	} else if (player.state.status === AudioPlayerStatus.Paused) {
		message.reply({
			embeds: [new EmbedBuilder().addFields({ name: 'Info', value: '動画が一時停止されています。' }).setColor('Yellow')]
		});
	} else {
		message.reply({
			embeds: [new EmbedBuilder().addFields({ name: 'Info', value: '動画が再生されていません。' }).setColor('Yellow')]
		});
	}
}
