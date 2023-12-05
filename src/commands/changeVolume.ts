import { client } from '../index';
import { Message } from 'discord.js';

export async function changeVolumeCommand(message: Message) {
	const player = client?.player;
	if (typeof player === 'undefined') return message.reply({ content: '動画が再生されていません。' });
	if (!message.content.split(' ')[1]) return message.reply({ content: `現在の音量は${player.volume}です。` });
	if (Number(message.content.split(' ')[1]) > 100) {
		player.changeVolume(100 / 10);
		return message.reply({ content: 'ボリュームを最大に設定しました。' });
	}

	if (Number(message.content.split(' ')[1]) < 0) {
		player.changeVolume(0 / 10);
		return message.reply({ content: 'ミュートに設定しました。' });
	}

	player.changeVolume(Number(message.content.split(' ')[1]) / 10);
	return message.reply({ content: `ボリュームを${player.volume * 10}に変更しました。` });
}
