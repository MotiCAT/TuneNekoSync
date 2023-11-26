import { Message, EmbedBuilder } from "discord.js"
// eslint-disable-next-line prefer-const
export let isLooping = false

export async function loopCommand(message: Message): Promise<void> {
    isLooping = !isLooping
    await message.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Looping', value: isLooping ? 'オン' : 'オフ' }).setColor('Green')] })
}