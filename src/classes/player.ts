import type { Queue } from './queue';
import { queueManager } from './queue';
import { joinVoiceChannel, createAudioPlayer } from '@discordjs/voice';
import { createAudioResource, StreamType, AudioPlayerStatus } from '@discordjs/voice';
import { Snowflake, VoiceBasedChannel } from 'discord.js';
import ytdl from 'ytdl-core';

export class YTPlayer {
	private connection: import('@discordjs/voice').VoiceConnection;
	public player: import('@discordjs/voice').AudioPlayer;
	public serverId: Snowflake;
	public queue: Queue<string>;
	public volume: number;
	public isPlaying: boolean;
	constructor(serverId: Snowflake, voiceChannel: VoiceBasedChannel) {
		this.isPlaying = false;
		this.serverId = serverId;
		this.connection = joinVoiceChannel({
			adapterCreator: voiceChannel.guild.voiceAdapterCreator,
			channelId: voiceChannel.id,
			guildId: serverId,
			selfDeaf: true,
			selfMute: false
		});
		this.player = createAudioPlayer();
		this.queue = queueManager.getQueue(serverId) as Queue<string>;
		this.volume = 100 / 10;
		this.player
			.on('subscribe', () => {
				this.isPlaying = true;
			})
			.on('unsubscribe', () => {
				this.isPlaying = false;
			})
			.on(AudioPlayerStatus.Idle, () => this.playNextSong());
	}

	public play() {
		const queue = queueManager.getQueue(this.serverId);
		const stream = ytdl(ytdl.getURLVideoID(queue?.currentSong as string), {
			filter: (format) => format.audioCodec === 'opus' && format.container === 'webm',
			quality: 'highest',
			highWaterMark: 32 * 1024 * 1024
		});
		const resource = createAudioResource(stream, {
			inputType: StreamType.WebmOpus,
			inlineVolume: true
		});
		resource.volume?.setVolume(0.1);
		this.connection.subscribe(this.player);
		this.player.play(resource);
	}

	public pause(): void {
		this.player.pause();
	}

	public resume(): void {
		this.player.unpause();
	}

	public stop(): void {
		this.player.stop();
		this.connection.destroy();
		queueManager.deleteQueue(this.serverId);
	}

	skip(): void {
		this.player.stop();
		this.playNextSong();
	}

	public changeVolume(volume: number): void {
		this.volume = volume / 10;
	}

	private playNextSong(): void {
		if (this.queue.loop === 'none') {
			if (!this.queue.store.length) return;
			else {
				if (this.queue.store.length > 1) this.queue.removeSong(0);
				if (this.queue.store.length === 1) {
					this.play();
					return this.queue.removeSong(0);
				}
				return this.play();
			}
		}
		if (this.queue.loop === 'queue') this.queue.loopQueue();
		if (this.queue.loop === 'track') this.queue.loopTrack();
		this.play();
	}
}
