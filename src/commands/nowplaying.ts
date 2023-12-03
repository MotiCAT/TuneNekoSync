import { getSongInfo } from '../Utils/songResolver';
import { queueManager, Queue } from '../classes/queue';
import { player } from './play';
import { Message } from 'discord.js';

export async function nowplayingCommand(message: Message) {
	if (typeof player === 'undefined') return message.reply({ content: '動画が再生されていません。' });
	const queue = queueManager.getQueue(message.guild?.id as string) as Queue;
	if (!queue.currentSong) return message.reply({ content: 'キューに曲がありません。' });
	const info = await getSongInfo(queue.currentSong);
	return message.reply(info);
}
