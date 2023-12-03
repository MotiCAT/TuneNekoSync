import { queueManager } from '../classes/queue';
import { Message, EmbedBuilder } from 'discord.js';

export async function stopCommand(message: Message): Promise<void> {
	if (message.guild?.members.me?.voice.channel) {
		message.guild.members.me.voice.disconnect();
		message.reply({
			embeds: [new EmbedBuilder().addFields({ name: 'Success', value: '再生を停止しました。' }).setColor('Green')]
		});
	}

	queueManager.queues.delete(message.guildId!);
}
