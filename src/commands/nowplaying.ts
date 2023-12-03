import { getSongInfo } from '../Utils/songResolver';
import { queueManager, Queue } from '../classes/queue';
import { embeds } from '../embeds';
import { player } from './play';
import { Message } from 'discord.js';

export async function nowplayingCommand(message: Message) {
	if (typeof player === 'undefined') return message.reply(embeds.videoNotPlaying);
	const queue = queueManager.getQueue(message.guild?.id as string) as Queue;
	if (!queue.currentSong) return message.reply(embeds.queueEmpty);
	const info = await getSongInfo(queue.currentSong);
	return message.reply(info);
}
