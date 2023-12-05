import { embeds } from '../embeds';
import { interactions } from '../interactions';
import { BaseInteraction, Awaitable, ChannelType, GuildMember } from 'discord.js';

export async function onInteractionCreate(interaction: BaseInteraction): Promise<Awaitable<void>> {
	if (!interaction.isChatInputCommand()) return;
	if (!interaction.guild) {
		interaction.reply({ content: 'This command can only be used in a server!', ephemeral: true });
	}
	const commandName = interaction.commandName;
	if (commandName === 'help') return interactions.help(interaction);
	if (!(interaction.member instanceof GuildMember)) return;
	const channel = interaction.member?.voice.channel;
	if (!channel) {
		interaction.reply(embeds.voiceChannelJoin);
		return;
	}
	if (channel.type !== ChannelType.GuildVoice) return;
	if (!channel.joinable) {
		interaction.reply(embeds.voiceChannnelJoined);
		return;
	}
	if (!channel.speakable) {
		interaction.reply(embeds.voiceChannnelPermission);
		return;
	}

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
