import { Builder } from '../Utils/Builder';
import { queueManager } from '../classes/queue';
import { Message } from 'discord.js';

export async function stopCommand(message: Message): Promise<void> {
	if (message.guild?.members.me?.voice.channel) {
		message.guild.members.me.voice.disconnect();
		message.reply(
			new Builder().addFields({ name: 'Success', value: '再生を停止しました。' }).setColor('Green').build()
		);
	}

	queueManager.queues.delete(message.guildId!);
}
