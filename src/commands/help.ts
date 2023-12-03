import { Builder } from '../Utils/Builder';
import { Message } from 'discord.js';

export async function helpCommand(message: Message): Promise<void> {
	message.reply(
		new Builder()
			.setTitle('Help')
			.setColor('Blue')
			.addFields(
				{ name: 'play', value: '音楽を再生します。' },
				{ name: 'queue', value: 'キューを表示します。' },
				{ name: 'loop', value: 'ループをオン/オフにします。' },
				{ name: 'skip', value: '現在の曲をスキップします。' },
				{ name: 'stop', value: '再生を停止します。' },
				{ name: 'pause', value: '再生を一時停止します。' },
				{ name: 'resume', value: '再生を再開します。' },
				{ name: 'help', value: 'このメッセージを表示します。' }
			)
			.build()
	);
}
