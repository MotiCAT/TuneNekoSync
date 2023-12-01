import { queueManager } from '../classes/queue';
import { Message } from 'discord.js';

export async function stopCommand(message: Message): Promise<void> {
	if (message.guild?.members.me?.voice.channel) {
		message.guild.members.me.voice.disconnect();
	}

	queueManager.queues.delete(message.guildId!);
}
