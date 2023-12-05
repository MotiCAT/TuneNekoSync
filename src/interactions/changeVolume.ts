import { client } from '../index';
import { ChatInputCommandInteraction } from 'discord.js';

export async function changeVolumeCommand(interaction: ChatInputCommandInteraction) {
	const player = client?.player;
	if (typeof player === 'undefined') return interaction.reply({ content: '動画が再生されていません。' });
	const number = interaction.options.getInteger('volume');
	if (!number) return interaction.reply({ content: `現在の音量は${player.volume}です。` });
	if (number > 100) {
		player.changeVolume(100 / 10);
		return interaction.reply({ content: 'ボリュームを最大に設定しました。' });
	}

	if (number < 0) {
		player.changeVolume(0 / 10);
		return interaction.reply({ content: 'ミュートに設定しました。' });
	}

	player.changeVolume(number / 10);
	return interaction.reply({ content: `ボリュームを${player.volume * 10}に変更しました。` });
}
