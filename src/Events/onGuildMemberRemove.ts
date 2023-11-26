import { ChannelType, EmbedBuilder, GuildMember, PartialGuildMember } from "discord.js"

export async function onGuildMemberRemove(member: GuildMember | PartialGuildMember) {
    if (member.guild.id !== '1058664724801257612') return
    const embed = new EmbedBuilder()
        .setTitle('Goodbye!')
        .setDescription(`さようなら, ${member.user}!\nまた来てね！\n\nGoodbye, ${member.user}!\nCome back soon!`)
        .setColor('#FC2347')
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()
        .setFooter({ text: 'CatHouse Products', iconURL: member.client.user?.displayAvatarURL() })
    const channel = await member.guild.channels.fetch('1160545808811315200')
    if (channel && channel.type === ChannelType.GuildText) {
        channel.send({ embeds: [embed] })
    }
}