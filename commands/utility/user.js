const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Provides information about the user. '),
    async execute(interaction) {
        await interaction.reply(`This comando foi rodado pelo ${interaction.user.username}, que logou ${interaction.member.joinedAt}.`);
    },
}