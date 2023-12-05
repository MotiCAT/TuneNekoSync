import { embeds } from '../embeds';
import { client } from '../index';
import { AudioPlayerStatus } from '@discordjs/voice';
import { Message } from 'discord.js';

export async function pauseCommand(message: Message) {
	const player = client?.player;
	if (typeof player === 'undefined') return message.reply(embeds.videoNotPlaying);

	if (player.player.state.status === AudioPlayerStatus.Playing) {
		player.pause();
		message.reply(embeds.videoPaused);
	} else if (player.player.state.status === AudioPlayerStatus.Paused) {
		player.resume();
		message.reply(embeds.videoResumed);
	} else {
		message.reply(embeds.videoNotPlaying);
	}
}
