import { joinVoiceChannel, createAudioPlayer } from '@discordjs/voice';
import { createAudioResource, StreamType, AudioPlayerStatus } from '@discordjs/voice';
import { Snowflake, VoiceBasedChannel } from 'discord.js';
import ytdl from 'ytdl-core';

export class Queue<T> {
	private _store: string[];
	public loop: 'none' | 'queue' | 'track';

	constructor() {
		this._store = [];
		this.loop = 'none';
	}

	public get store(): string[] {
		return this._store;
	}

	public get currentSong(): string | undefined {
		return this._store[0] ?? undefined;
	}

	public addSong(url: string): void {
		this._store.push(url);
	}

	public removeSong(index: number): void {
		this._store.splice(index, 1);
	}

	public shift(): string | undefined {
		return this._store.shift();
	}

	public shuffle(): void {
		this._store.sort(() => Math.random() - 0.5);
	}

	public loopQueue(): void {
		const first = this._store.shift();
		if (first) this._store.push(first);
	}

	public loopTrack(): void {
		const first = this._store.shift();
		if (first) this._store.unshift(first);
	}

	public setLoop(loop: 'none' | 'queue' | 'track'): string {
		this.loop = loop;
		return loop;
	}
}
class QueueManager {
	private _queues: Map<Snowflake, Queue<string>>;

	constructor() {
		this._queues = new Map();
	}

	public get queues(): Map<Snowflake, Queue<string>> {
		return this._queues;
	}

	public getQueue(serverId: Snowflake): Queue<string> | undefined {
		return this._queues.get(serverId);
	}

	public setQueue(serverId: Snowflake, queue: Queue<string>): void {
		this._queues.set(serverId, queue);
	}

	public deleteQueue(serverId: Snowflake): boolean {
		return this._queues.delete(serverId);
	}
}

export const queueManager = new QueueManager();

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
