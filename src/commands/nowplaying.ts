import { getSongInfo } from '../Utils/songResolver';
import { queueManager, Queue } from '../classes/queue';
import { embeds } from '../embeds';
import { client } from '../index';
import { Message } from 'discord.js';

export async function nowplayingCommand(message: Message) {
	const player = client?.player;
	if (typeof player === 'undefined') return message.reply(embeds.videoNotPlaying);
	const queue = queueManager.getQueue(message.guild?.id as string) as Queue;
	const info = await getSongInfo(queue.currentSong);
	return message.reply(info);
}
