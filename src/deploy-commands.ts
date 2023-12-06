import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import { config } from 'dotenv';

config();

const commands = [
	new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play a song')
		.addStringOption((option) => option.setName('url').setDescription('The song to play').setRequired(true)),
	new SlashCommandBuilder().setName('pause').setDescription('Pause the current song'),
	new SlashCommandBuilder().setName('resume').setDescription('Resume the current song'),
	new SlashCommandBuilder().setName('skip').setDescription('Skip the current song'),
	new SlashCommandBuilder().setName('stop').setDescription('Stop the current song'),
	new SlashCommandBuilder().setName('queue').setDescription('View the current queue'),
	new SlashCommandBuilder()
		.setName('loop')
		.setDescription('Loop the current song')
		.addStringOption((option) =>
			option
				.setName('mode')
				.setDescription('The loop mode')
				.addChoices(
					{ name: 'off', value: 'none' },
					{ name: 'queue', value: 'queue' },
					{ name: 'track', value: 'track' }
				)
				.setRequired(false)
		),
	new SlashCommandBuilder()
		.setName('volume')
		.setDescription('Change the volume')
		.addIntegerOption((option) => option.setName('volume').setDescription('The volume to change to')),
	new SlashCommandBuilder().setName('nowplaying').setDescription('View the currently playing song'),
	new SlashCommandBuilder().setName('help').setDescription('View the help menu')
];

const rest = new REST().setToken(process.env.TOKEN!);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(Routes.applicationCommands(process.env.BOTUSERID!), { body: commands });

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();
