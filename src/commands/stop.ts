import { client } from '../index';
import { queueManager } from '../classes/queue';
import { embeds } from '../embeds';
import { Message } from 'discord.js';

export async function stopCommand(message: Message): Promise<void> {
	if (message.guild?.members.me?.voice.channel) {
		message.guild.members.me.voice.disconnect();
		client.player = undefined;
		message.reply(embeds.videoStopped);
	} else {
		message.reply(embeds.videoNotPlaying);
	}

	queueManager.queues.delete(message.guildId!);
}
