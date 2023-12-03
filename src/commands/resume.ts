import { embeds } from '../embeds';
import { player } from './play';
import { AudioPlayerStatus } from '@discordjs/voice';
import { Message } from 'discord.js';

export async function resumeCommand(message: Message) {
	if (typeof player === 'undefined') return message.reply(embeds.videoNotPlaying);
	if (player.player.state.status === AudioPlayerStatus.Paused) {
		player.resume();
		message.reply(embeds.videoResumed);
	} else if (player.player.state.status === AudioPlayerStatus.Playing) {
		message.reply(embeds.videoNotPaused);
	} else {
		message.reply(embeds.videoNotPlaying);
	}
}
