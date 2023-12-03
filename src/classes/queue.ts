import { Snowflake } from 'discord.js';

export class Queue {
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

	public get length(): number {
		return this._store.length;
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
	private _queues: Map<Snowflake, Queue>;

	constructor() {
		this._queues = new Map();
	}

	public get queues(): Map<Snowflake, Queue> {
		return this._queues;
	}

	public getQueue(serverId: Snowflake): Queue | undefined {
		return this._queues.get(serverId);
	}

	public setQueue(serverId: Snowflake, queue: Queue): void {
		this._queues.set(serverId, queue);
	}

	public deleteQueue(serverId: Snowflake): boolean {
		return this._queues.delete(serverId);
	}
}

export const queueManager = new QueueManager();
