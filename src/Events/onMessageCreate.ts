import { commands } from '../commands';
import { embeds } from '../embeds';
import { Message, Awaitable } from 'discord.js';

const prefix = 'ts!';

export async function onMessageCreate(message: Message): Promise<Awaitable<void>> {
	if (message.author.bot || !message.content.startsWith(prefix) || !message.guild) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/) as string[];
	const commandName = args.shift()?.toLowerCase();

	switch (commandName) {
		case 'play':
		case 'p':
			commands.play(message);
			break;
		case 'stop':
		case 'leave':
			commands.stop(message);
			break;
		case 'pause':
			commands.pause(message);
			break;
		case 'resume':
		case 'continue':
		case 're':
			commands.resume(message);
			break;
		case 'loop':
		case 'repeat':
		case 'l':
			commands.loop(message, args);
			break;
		case 'skip':
		case 's':
		case 'next':
			commands.skip(message);
			break;
		case 'queue':
		case 'q':
		case 'list':
			commands.queue(message);
			break;
		case 'help':
		case 'h':
			commands.help(message);
			break;
		case 'volume':
		case 'vol':
		case 'v':
			commands.changeVolume(message);
			break;
		case 'nowplaying':
		case 'np':
		case 'current':
			commands.nowplaying(message);
			break;
		default:
			message.reply(embeds.unknownCommand);
			break;
	}
}
