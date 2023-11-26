import { Message, EmbedBuilder } from "discord.js"
import { play } from "../functions/play"
import { AudioPlayer } from "@discordjs/voice"

export async function skipCommand(message: Message, queue: string[], nextUrl: string | undefined, player: AudioPlayer) {
    if (queue.length > 0) {
        nextUrl = queue.shift() ?? undefined
        if (!nextUrl) {
            message.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Info', value: 'キューが空です。' }).setColor('Yellow')] })
            return
        }
        play(nextUrl, player)
        message.reply({
            embeds: [new EmbedBuilder().addFields({ name: 'Success', value: '動画をスキップしました。' }).setColor('Green')],
        })
    } else {
        message.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Info', value: 'キューが空です。' }).setColor('Yellow')] })
    }
}