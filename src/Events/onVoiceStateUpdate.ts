import { queue } from './onMessageCreate';
import { VoiceState } from 'discord.js';

export async function onVoiceStateUpdate(oldState: VoiceState, newState: VoiceState) {
	const botId = oldState.client.user?.id;
	const channel = oldState.channel;
	if (!botId) return;

	if (channel && channel.members.size === 1 && channel.members.has(botId)) {
		newState.guild.members.me?.voice.disconnect();
		queue.length = 0;
	}
}
