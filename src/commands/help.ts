import { embeds } from '../embeds';
import { Message } from 'discord.js';

export async function helpCommand(message: Message): Promise<void> {
	message.reply(embeds.help);
}
