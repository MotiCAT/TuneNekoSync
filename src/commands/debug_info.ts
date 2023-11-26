import { Message } from 'discord.js'
import ytdl from 'ytdl-core'

export async function debugCommand(message: Message): Promise<void> {
    const url = message.content.split(' ')[1]
    if (!url) {
        message.reply({ content: 'URLを指定してください。' })
        return
    }
    if (!ytdl.validateURL(url)) {
        message.reply({ content: '無効なURLです。' })
        return
    }
    const info = await ytdl.getInfo(url)
    console.table({
        title: info.videoDetails.title,
        url: info.videoDetails.video_url,
        description: info.videoDetails.description,
        thumbnail: info.videoDetails.thumbnails[0].url,
    })
}