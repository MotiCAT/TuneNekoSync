import { Queue, queueManager } from '../classes/queue';
import { VoiceState } from 'discord.js';

export async function onVoiceStateUpdate(oldState: VoiceState, newState: VoiceState) {
	const botId = oldState.client.user?.id;
	const channel = oldState.channel;
	if (!botId) return;

	if (channel && channel.members.size === 1 && channel.members.has(botId)) {
		newState.guild.members.me?.voice.disconnect();
		queueManager.deleteQueue(newState.guild.id);
	}

	if (!queueManager.getQueue(newState.guild.id)) queueManager.setQueue(newState.guild.id, new Queue<string>());
}
