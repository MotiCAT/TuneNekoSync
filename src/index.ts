import { onMessageCreate } from './Events/onMessageCreate';
import { onReady } from './Events/onReady';
import { onVoiceStateUpdate } from './Events/onVoiceStateUpdate';
import { Client, GatewayIntentBits, Message, VoiceState } from 'discord.js';
import { config } from 'dotenv';

config();

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates
	],
	allowedMentions: {
		repliedUser: false
	}
});

client
	.once('ready', () => onReady(client))
	.on('messageCreate', async (message: Message) => onMessageCreate(message))
	.on('voiceStateUpdate', async (oldState: VoiceState, newState: VoiceState) => onVoiceStateUpdate(oldState, newState))
	.login(process.env.TOKEN);
