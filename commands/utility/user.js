const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Provides information about the user. '),
    async execute(interaction) {
        const locales = {
                'en-US': `This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`,
                'es-ES': `Este comando fue ejecutado por ${interaction.user.username}, quien se unió el ${interaction.member.joinedAt}.`,
                fr: `Cette commande a été exécutée par ${interaction.user.username}, qui a rejoint le ${interaction.member.joinedAt}.`,
                ja: `${interaction.user.username} がこのコマンドを実行しました。参加日時: ${interaction.member.joinedAt}。`,
        };

        await interaction.reply(locales[interaction.locale] ?? `Esse comando foi rodado pelo ${interaction.user.username}, que logou ${interaction.member.joinedAt}.`);
    },
}