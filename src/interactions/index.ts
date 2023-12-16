import { changeVolumeCommand } from './changeVolume';
import { helpmenuCommand } from './handlehelp';
import { searchPlayCommand } from './handleplay';
import { helpCommand } from './help';
import { loopCommand } from './loop';
import { nowplayingCommand } from './nowplaying';
import { pauseCommand } from './pause';
import { playCommand } from './play';
import { queueCommand } from './queue';
import { resumeCommand } from './resume';
import { searchCommand } from './search';
import { skipCommand } from './skip';
import { stopCommand } from './stop';

export const interactions = {
	changeVolume: changeVolumeCommand,
	help: helpCommand,
	loop: loopCommand,
	nowplaying: nowplayingCommand,
	pause: pauseCommand,
	play: playCommand,
	queue: queueCommand,
	resume: resumeCommand,
	skip: skipCommand,
	stop: stopCommand,
	search: searchCommand,
	searchplay: searchPlayCommand,
	helpmenu: helpmenuCommand
};
