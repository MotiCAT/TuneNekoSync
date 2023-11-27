import { isLooping } from '../commands/loop';
import { play } from '../functions/play';
import { AudioPlayer } from '@discordjs/voice';

export async function PlayeronIdle(player: AudioPlayer, queue: string[], nextUrl: string | undefined, url: string) {
	if (isLooping) return play(url, player);

	if (queue.length > 0) {
		nextUrl = queue.shift() ?? undefined;
		if (!nextUrl) return;
		play(nextUrl, player);
	}
}
