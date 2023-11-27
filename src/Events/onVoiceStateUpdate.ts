import { queue } from './onMessageCreate';
import { VoiceState } from 'discord.js';

export async function onVoiceStateUpdate(oldState: VoiceState, newState: VoiceState) {
	console.log('VoiceStateUpdate');
	const botId = oldState.client.user?.id;
	if (!botId) return;
	const channel = oldState.channel;

	if (channel && channel.members.size === 1 && channel.members.has(botId)) {
		console.log('a');
		newState.guild.members.me?.voice.disconnect();
		queue.length = 0;
	}
}
