import { Message, EmbedBuilder } from 'discord.js'
import ytdl from 'ytdl-core'

export async function queueCommand(message: Message, queue: string[]): Promise<void> {
    if (queue.length === 0) {
        message.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Info', value: 'キューが空です。' }).setColor('Yellow')] })
        return
    }
    const embed = new EmbedBuilder()
        .setTitle('Queue')
        .setColor('Blue')
        await Promise.all(queue.map(async (url, index) => {
            const info = await ytdl.getInfo(url)
            embed.addFields({ name: `${index + 1}. ${info.videoDetails.title}`, value: `[${info.videoDetails.author.name}](${info.videoDetails.author.channel_url})`})
        }))
        message.reply({ embeds: [embed] })
}