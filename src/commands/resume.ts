import { Message, EmbedBuilder } from "discord.js"
import { AudioPlayer, AudioPlayerStatus } from "@discordjs/voice"

export async function resumeCommand(message: Message, player: AudioPlayer) {
    if (player.state.status === AudioPlayerStatus.Paused) {
        player.unpause()
        message.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Success', value: '動画を再開しました。' }).setColor('Green')] })
    } else if (player.state.status === AudioPlayerStatus.Playing) {
        message.reply({
            embeds: [new EmbedBuilder().addFields({ name: 'Info', value: '動画が一時停止されていません。' }).setColor('Yellow')],
        })
    } else {
        message.reply({
            embeds: [new EmbedBuilder().addFields({ name: 'Info', value: '動画が再生されていません。' }).setColor('Yellow')],
        })
    }
}