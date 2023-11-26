import { Message, EmbedBuilder, ChannelType } from "discord.js"
import { play } from "../functions/play"
import { VoiceConnection, AudioPlayer, AudioPlayerStatus, joinVoiceChannel } from "@discordjs/voice"
import ytdl from "ytdl-core"
export let url: string

export async function playCommand(message: Message, queue: string[], connection: VoiceConnection | null, player: AudioPlayer) {
    url = message.content.split(" ")[1]
    const channel = message.member?.voice.channel
    if (!url) {
        message.reply({ embeds: [new EmbedBuilder().addFields({ name: "Error", value: "URLを指定してください" }).setColor("Red")] })
        return
    }
    if (!ytdl.validateURL(url)) {
        message.reply({ embeds: [new EmbedBuilder().addFields({ name: "Error", value: "無効なURLです。" }).setColor("Red")] })
        return
    }
    if (!channel) {
        message.reply({
            embeds: [new EmbedBuilder().addFields({ name: "Error", value: "ボイスチャンネルに参加してから実行してください。" }).setColor("Red")],
        })
        return
    }
    if (channel.type !== ChannelType.GuildVoice) return
    if (!channel.joinable) {
        message.reply({
            embeds: [new EmbedBuilder().addFields({ name: "Error", value: "このチャンネルに参加できません。" }).setColor("Red")],
        })
        return
    }
    if (!channel.speakable) {
        message.reply({
            embeds: [new EmbedBuilder().addFields({ name: "Error", value: "このチャンネルで喋れません。" }).setColor("Red")],
        })
        return
    }
    if (queue.length > 0 || player.state.status === AudioPlayerStatus.Playing) {
        queue.push(url)
        const info = await ytdl.getInfo(url)
        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle("Info")
                    .setDescription(`**[${info.videoDetails.title}](${info.videoDetails.video_url})キューに追加しました。**`)
                    .addFields({
                        name: info.videoDetails.title,
                        value: `投稿者: [${info.videoDetails.author.name}](${info.videoDetails.author.channel_url})`,
                    })
                    .setImage(info.videoDetails.thumbnails[0].url.split("?")[0])
                    .setColor("Yellow"),
            ],
        })
        return
    } else {
        if (!url) {
            message.reply({
                embeds: [new EmbedBuilder().addFields({ name: "Error", value: "URLを指定してください。" }).setColor("Red")],
            })
            return
        }
        if (!ytdl.validateURL(url)) {
            message.reply({ embeds: [new EmbedBuilder().addFields({ name: "Error", value: "無効なURLです。" }).setColor("Red")] })
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
        const info = await ytdl.getInfo(url)
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
    }
}
