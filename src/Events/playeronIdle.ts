import { AudioPlayer } from "@discordjs/voice"
import { play } from "../functions/play"
import { isLooping } from "../commands/loop"

export async function PlayeronIdle(player: AudioPlayer, queue: string[], nextUrl: string | undefined, url: string) {
    if (isLooping) {
        play(url, player)
        return
    }
    if (queue.length > 0) {
        nextUrl = queue.shift() ?? undefined
        if (!nextUrl) {
            return
        }
        play(nextUrl, player)
    }
}