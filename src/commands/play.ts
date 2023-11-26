import { Message, EmbedBuilder, ChannelType } from 'discord.js'
import { play } from '../functions/play'
import { VoiceConnection, AudioPlayer, AudioPlayerStatus, joinVoiceChannel } from '@discordjs/voice'
import ytdl from 'ytdl-core'

export async function playCommand(message: Message, url: string, queue: string[], connection: VoiceConnection | null, player: AudioPlayer) {
    url = message.content.split(' ')[1]
    const channel = message.member?.voice.channel
    if (!url) {
        message.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Error', value: 'URLを指定してください' }).setColor('Red')] })
        return
    }
    if (!ytdl.validateURL(url)) {
        message.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Error', value: '無効なURLです。' }).setColor('Red')] })
        return
    }
    if (!channel) {
        message.reply({
            embeds: [new EmbedBuilder().addFields({ name: 'Error', value: 'ボイスチャンネルに参加してから実行してください。' }).setColor('Red')],
        })
        return
    }
    if (channel.type !== ChannelType.GuildVoice) return
    if (!channel.joinable) {
        message.reply({
            embeds: [new EmbedBuilder().addFields({ name: 'Error', value: 'このチャンネルに参加できません。' }).setColor('Red')],
        })
        return
    }
    if (!channel.speakable) {
        message.reply({
            embeds: [new EmbedBuilder().addFields({ name: 'Error', value: 'このチャンネルで喋れません。' }).setColor('Red')],
        })
        return
    }
    if (queue.length > 0 || player.state.status === AudioPlayerStatus.Playing) {
        queue.push(url)
        message.reply({
            embeds: [new EmbedBuilder().addFields({ name: 'Success', value: '動画をキューに追加しました。' }).setColor('Green')],
        })
        return
    } else {
        if (!url) {
            message.reply({
                embeds: [new EmbedBuilder().addFields({ name: 'Error', value: 'URLを指定してください。' }).setColor('Red')],
            })
            return
        }
        if (!ytdl.validateURL(url)) {
            message.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Error', value: '無効なURLです。' }).setColor('Red')] })
            return
        }
        if (!connection) {
            connection = joinVoiceChannel({
                adapterCreator: channel.guild.voiceAdapterCreator,
                channelId: channel.id,
                guildId: channel.guild.id,
                selfDeaf: true,
                selfMute: false,
            })
        }
        connection.subscribe(player)
        play(url, player)
    }
}
