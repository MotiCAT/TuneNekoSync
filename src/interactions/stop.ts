import { queueManager } from '../classes/queue';
import { embeds } from '../embeds';
import { client } from '../index';
import { ChatInputCommandInteraction } from 'discord.js';

export async function stopCommand(interaction: ChatInputCommandInteraction): Promise<void> {
	if (interaction.guild?.members.me?.voice.channel) {
		interaction.guild.members.me.voice.disconnect();
		client.player = undefined;
		interaction.reply(embeds.videoStopped);
	} else interaction.reply(embeds.videoNotPlaying);

	queueManager.queues.delete(interaction.guildId!);
}
