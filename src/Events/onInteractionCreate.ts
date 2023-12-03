import { embeds } from '../embeds';
import { interactions } from '../interactions';
import { BaseInteraction, Awaitable } from 'discord.js';

export async function onInteractionCreate(interaction: BaseInteraction): Promise<Awaitable<void>> {
	if (!interaction.isChatInputCommand()) return;
	if (!interaction.guild) {
		interaction.reply({ content: 'This command can only be used in a server!', ephemeral: true });
	}
	const commandName = interaction.commandName;

	switch (commandName) {
		case 'play':
			interactions.play(interaction);
			break;
		case 'stop':
			interactions.stop(interaction);
			break;
		case 'pause':
			interactions.pause(interaction);
			break;
		case 'resume':
			interactions.resume(interaction);
			break;
		case 'loop':
			interactions.loop(interaction);
			break;
		case 'skip':
			interactions.skip(interaction);
			break;
		case 'queue':
			interactions.queue(interaction);
			break;
		case 'help':
			interactions.help(interaction);
			break;
		case 'volume':
			interactions.changeVolume(interaction);
			break;
		case 'nowplaying':
			interactions.nowplaying(interaction);
			break;
		default:
			interaction.reply(embeds.unknownCommand);
			break;
	}
}
