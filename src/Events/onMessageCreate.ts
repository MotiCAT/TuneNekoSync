import { commands } from '../commands';
import { Message, EmbedBuilder, Awaitable } from 'discord.js';

const prefix = 'ts!';

export async function onMessageCreate(message: Message): Promise<Awaitable<void>> {
	if (message.author.bot || !message.content.startsWith(prefix) || !message.guild) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/) as string[];
	const commandName = args.shift()?.toLowerCase();

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
					new EmbedBuilder()
						.addFields({ name: 'Error', value: '不明なコマンドかコマンドが指定されていません。' })
						.setColor('Red')
				]
			});
			break;
	}
}
