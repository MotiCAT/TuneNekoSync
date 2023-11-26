import { AudioPlayer } from "@discordjs/voice"
import { play } from "../functions/play"

export async function PlayeronIdle(player: AudioPlayer, queue: string[], nextUrl: string | undefined) {
    if (queue.length > 0) {
        nextUrl = queue.shift() ?? undefined
        if (!nextUrl) {
            return
        }
        play(nextUrl, player)
    }
}