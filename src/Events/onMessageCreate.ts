import { helpCommand } from '../commands/help';
import { loopCommand } from '../commands/loop';
import { pauseCommand } from '../commands/pause';
import { playCommand } from '../commands/play';
import { queueCommand } from '../commands/queue';
import { resumeCommand } from '../commands/resume';
import { skipCommand } from '../commands/skip';
import { stopCommand } from '../commands/stop';
import { Message, EmbedBuilder } from 'discord.js';

const prefix = 'ts!';

export async function onMessageCreate(message: Message) {
	if (message.author.bot || !message.content.startsWith(prefix) || !message.guild) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/) as string[];
	const commandName = args.shift()?.toLowerCase();
	if (!commandName) return;

	switch (commandName) {
		case 'play':
			playCommand(message);
			break;
		case 'stop':
			stopCommand(message);
			break;
		case 'pause':
			pauseCommand(message);
			break;
		case 'resume':
			resumeCommand(message);
			break;
		case 'loop':
			loopCommand(message, args);
			break;
		case 'skip':
			skipCommand(message);
			break;
		case 'queue':
			queueCommand(message);
			break;
		case 'help':
			helpCommand(message);
			break;
		default:
			message.reply({
				embeds: [
					new EmbedBuilder().addFields({ name: 'Error', value: 'コマンドが見つかりませんでした。' }).setColor('Red')
				]
			});
			break;
	}
}
