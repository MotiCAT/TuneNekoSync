import { commands } from '../commands';
import { Message, EmbedBuilder } from 'discord.js';

const prefix = 'ts!';

export async function onMessageCreate(message: Message) {
	if (message.author.bot || !message.content.startsWith(prefix) || !message.guild) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/) as string[];
	const commandName = args.shift()?.toLowerCase();
	if (!commandName) return;

	switch (commandName) {
		case 'play':
			commands.play(message);
			break;
		case 'stop':
			commands.stop(message);
			break;
		case 'pause':
			commands.pause(message);
			break;
		case 'resume':
			commands.resume(message);
			break;
		case 'loop':
			commands.loop(message, args);
			break;
		case 'skip':
			commands.skip(message);
			break;
		case 'queue':
			commands.queue(message);
			break;
		case 'help':
			commands.help(message);
			break;
		case 'volume':
			commands.changeVolume(message);
			break;
		case 'nowplaying':
			commands.nowplaying(message);
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
