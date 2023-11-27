import { Message, EmbedBuilder } from 'discord.js';

export let isLooping = false;

export async function loopCommand(message: Message): Promise<void> {
	isLooping = !isLooping;
	message.reply({
		embeds: [new EmbedBuilder().addFields({ name: 'Looping', value: isLooping ? 'オン' : 'オフ' }).setColor('Green')]
	});
}
