import { changeVolumeCommand } from './changeVolume';
import { helpCommand } from './help';
import { loopCommand } from './loop';
import { nowplayingCommand } from './nowplaying';
import { pauseCommand } from './pause';
import { playCommand } from './play';
import { queueCommand } from './queue';
import { resumeCommand } from './resume';
import { skipCommand } from './skip';
import { stopCommand } from './stop';

export const commands = {
	changeVolume: changeVolumeCommand,
	help: helpCommand,
	loop: loopCommand,
	nowplaying: nowplayingCommand,
	pause: pauseCommand,
	play: playCommand,
	queue: queueCommand,
	resume: resumeCommand,
	skip: skipCommand,
	stop: stopCommand
};
