import { Message } from 'discord.js'

export async function stopCommand(message: Message, queue: string[]): Promise<void> {
    if (message.guild?.members.me?.voice.channel) {
        message.guild.members.me.voice.disconnect()
        queue.length = 0
        return
    }
}
