import { createAudioResource, StreamType, AudioPlayer } from '@discordjs/voice'
import ytdl from 'ytdl-core'
export async function play(url: string, player: AudioPlayer) {
    const stream = ytdl(ytdl.getURLVideoID(url), {
        filter: (format) => format.audioCodec === 'opus' && format.container === 'webm',
        quality: 'highest',
        highWaterMark: 32 * 1024 * 1024,
    })
    const resource = createAudioResource(stream, {
        inputType: StreamType.WebmOpus,
        inlineVolume: true,
    })
    resource.volume?.setVolume(0.1)
    player.play(resource)
}
