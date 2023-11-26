import { Message, EmbedBuilder } from "discord.js"
import { play } from "../functions/play"
import { AudioPlayer } from "@discordjs/voice"
import ytdl from "ytdl-core"

export async function skipCommand(message: Message, queue: string[], nextUrl: string | undefined, player: AudioPlayer) {
    if (queue.length > 0) {
        nextUrl = queue.shift() ?? undefined
        if (!nextUrl) {
            message.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Info', value: 'キューが空です。' }).setColor('Yellow')] })
            return
        }
        play(nextUrl, player)
        const info = await ytdl.getInfo(nextUrl)
        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle("Success")
                    .setDescription(`**[${info.videoDetails.title}](${info.videoDetails.video_url})を再生します。**`)
                    .addFields({
                        name: info.videoDetails.title,
                        value: `投稿者: [${info.videoDetails.author.name}](${info.videoDetails.author.channel_url})`,
                    })
                    .setImage(info.videoDetails.thumbnails[0].url.split("?")[0])
                    .setColor("Green"),
            ],
        })
    } else {
        message.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Info', value: 'キューが空です。' }).setColor('Yellow')] })
    }
}