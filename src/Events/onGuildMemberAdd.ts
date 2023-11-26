import { ChannelType, EmbedBuilder, GuildMember } from "discord.js"

export async function onGuildMemberAdd(member: GuildMember) {
    if (member.guild.id !== '1058664724801257612') return
    const embed = new EmbedBuilder()
        .setTitle('Welcome to CatHouse Products!')
        .setDescription(
            `CatHouse Productsへようこそ, ${member.user}!\nまずは <#1058665600517410886> を読んでください！\n\nWelcome to CatHouse Products, ${member.user}!\nPlease read <#1058665600517410886> first!`
        )
        .setColor('#3CB371')
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()
        .setFooter({ text: 'CatHouse Products', iconURL: member.client.user?.displayAvatarURL() })
    const channel = await member.guild.channels.fetch('1160545808811315200')
    if (channel && channel.type === ChannelType.GuildText) {
        channel.send({ embeds: [embed] })
    }
}