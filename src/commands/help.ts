import { Message, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } from 'discord.js';

export async function helpCommand(message: Message) {
	const menu = new StringSelectMenuBuilder()
		.setCustomId('help')
		.setPlaceholder('Select a category')
		.addOptions([
			new StringSelectMenuOptionBuilder()
				.setLabel('再生操作')
				.setValue('music')
				.setDescription('Commands related to music'),
			new StringSelectMenuOptionBuilder()
				.setLabel('情報取得')
				.setValue('misc')
				.setDescription('Commands related to getting information'),
			new StringSelectMenuOptionBuilder()
				.setLabel('検索')
				.setValue('search')
				.setDescription('Commands related to searching')
		]);
	const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(menu);
	return message.reply({ content: 'カテゴリーを選択してください！', components: [row] });
}
