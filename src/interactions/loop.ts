import { queueManager, Queue } from '../classes/queue';
import { embeds } from '../embeds';
import { player } from './play';
import { ChatInputCommandInteraction } from 'discord.js';

export async function loopCommand(interaction: ChatInputCommandInteraction) {
	if (typeof player === 'undefined') return interaction.reply(embeds.videoNotPlaying);
	const queue = queueManager.queues.get(interaction.guildId!) as Queue;
	const settings = interaction.options.getString('mode') as string;
	if (!settings) {
		queue.loop === 'none' ? queue.setLoop('queue') : queue.setLoop('none');
	} else if (settings) {
		switch (settings) {
			case 'none':
				queue?.setLoop('none');
				break;
			case 'queue':
				queue?.setLoop('queue');
				break;
			case 'track':
				queue?.setLoop('track');
				break;
			default:
				interaction.reply(embeds.commandNotFound);
				break;
		}
	}

	interaction.reply(new embeds.embed().addFields({ name: 'Looping', value: queue.loop! }).setColor('Green').build());
}
