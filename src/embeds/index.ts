import { Builder } from '../Utils/Builder';

export const embeds = {
	embed: new Builder(),
	help: new Builder()
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
		.build(),
	videoNotPlaying: new Builder()
		.addFields({ name: 'Info', value: '動画が再生されていません。' })
		.setColor('Yellow')
		.build(),
	videoResumed: new Builder().addFields({ name: 'Success', value: '動画を再開しました。' }).setColor('Green').build(),
	videoPaused: new Builder()
		.addFields({ name: 'Success', value: '動画を一時停止しました。' })
		.setColor('Green')
		.build(),
	videoNotPaused: new Builder()
		.addFields({ name: 'Info', value: '動画は一時停止されていません。' })
		.setColor('Yellow')
		.build(),
	videoStopped: new Builder().addFields({ name: 'Success', value: '動画を停止しました。' }).setColor('Green').build(),
	noUrl: new Builder().addFields({ name: 'Error', value: 'URLを指定してください。' }).setColor('Red').build(),
	invaildUrl: new Builder()
		.addFields({ name: 'Error', value: '有効なURLを指定してください。' })
		.setColor('Red')
		.build(),
	voiceChannnelPermission: new Builder()
		.addFields({ name: 'Error', value: 'ボイスチャンネルに参加する権限がありません。' })
		.setColor('Red')
		.build(),
	voiceChannnelJoined: new Builder()
		.addFields({ name: 'Error', value: 'ボイスチャンネルに既に参加しています。' })
		.setColor('Red')
		.build(),
	queueEmpty: new Builder().addFields({ name: 'Error', value: 'キューが空です。' }).setColor('Red').build(),
	unknownCommand: new Builder()
		.addFields({ name: 'Error', value: '不明なコマンドかコマンドが指定されていません。' })
		.setColor('Red')
		.build(),
	voiceChannelJoin: new Builder()
		.addFields({ name: 'Error', value: 'ボイスチャンネルに参加してから実行してください。' })
		.setColor('Red')
		.build(),
	commandNotFound: new Builder()
		.addFields({ name: 'Error', value: 'コマンドが見つかりませんでした。' })
		.setColor('Red')
		.build()
};
