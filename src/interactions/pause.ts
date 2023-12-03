import { embeds } from '../embeds';
import { player } from './play';
import { AudioPlayerStatus } from '@discordjs/voice';
import { ChatInputCommandInteraction } from 'discord.js';

export async function pauseCommand(interaction: ChatInputCommandInteraction) {
	if (typeof player === 'undefined') return interaction.reply(embeds.videoNotPlaying);

	if (player.player.state.status === AudioPlayerStatus.Playing) {
		player.pause();
		interaction.reply(embeds.videoPaused);
	} else if (player.player.state.status === AudioPlayerStatus.Paused) {
		player.resume();
		interaction.reply(embeds.videoResumed);
	} else {
		interaction.reply(embeds.videoNotPlaying);
	}
}
