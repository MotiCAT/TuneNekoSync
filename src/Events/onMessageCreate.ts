import { AudioPlayerStatus, VoiceConnection, createAudioPlayer } from "@discordjs/voice"
import { Message, EmbedBuilder } from "discord.js"

import { PlayeronIdle } from "./playeronIdle"

import { loopCommand } from "../commands/loop"
import { pauseCommand } from "../commands/pause"
import { playCommand, url } from "../commands/play"
import { resumeCommand } from "../commands/resume"
import { skipCommand } from "../commands/skip"
import { stopCommand } from "../commands/stop"
import { queueCommand } from "../commands/queue"


const player = createAudioPlayer()

export const queue = <string[]>[]
let nextUrl: string | undefined
const prefix = "ts!"

export async function onMessageCreate(message: Message, connection: VoiceConnection | null) {
    if (message.author.bot || !message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const commandName = args.shift()?.toLowerCase()
    if (!commandName) return
    switch (commandName) {
        case "loop":
            loopCommand(message)
            break
        case "pause":
            pauseCommand(message, player)
            break
        case "play":
            playCommand(message, queue, connection, player)
            break
        case "resume":
            resumeCommand(message, player)
            break
        case "skip":
            skipCommand(message, queue, nextUrl, player)
            break
        case "stop":
            stopCommand(message, queue)
            break
        case "queue":
            queueCommand(message, queue)
            break
        default:
            message.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Error', value: 'コマンドが見つかりませんでした。' }).setColor('Red')] })
            break
    }
    player.on(AudioPlayerStatus.Idle, () => PlayeronIdle(player, queue, nextUrl, url))
}