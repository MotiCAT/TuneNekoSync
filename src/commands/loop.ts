import { Message, EmbedBuilder } from "discord.js"

export async function loopCommand(message: Message, isLooping: boolean): Promise<void> {
    isLooping = !isLooping
    await message.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Looping', value: isLooping ? 'オン' : 'オフ' }).setColor('Green')] })
}