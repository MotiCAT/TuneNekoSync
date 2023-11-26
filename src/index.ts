import  { Client, GatewayIntentBits, Message, VoiceState } from 'discord.js'
import { VoiceConnection } from '@discordjs/voice'
import { config } from 'dotenv'
import { onReady } from './Events/onReady'
import { onMessageCreate } from './Events/onMessageCreate'
import { onVoiceStateUpdate } from './Events/onVoiceStateUpdate'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let connection: VoiceConnection | null

config()

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ],
})

client.once('ready', () => onReady(client))
      .on('messageCreate', async (message: Message) => onMessageCreate(message, connection))
      .on('voiceStateUpdate', async (oldState: VoiceState, newState: VoiceState) => onVoiceStateUpdate(oldState, newState))
      .login(process.env.TOKEN)
