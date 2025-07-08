const { SlashCommandBuilder, subtext } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Get info about the server or user')
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('info about the user')
                .addUserOption(option => option.setName('target').setDescription('the user'))
        ).addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription('Info about the server')
        ),
    async execute(interaction){
        const subcommand = interaction.options.getSubcommand();

        if (subcommand === 'user'){
            const user = interaction.options.getUser('target') || interaction.user;
            const member = interaction.options.getMember('target') || interaction.member

            const locales = {
                'en-US': `${user.username} joined this server on ${member.joinedAt}.`,
                'es-ES': `${user.username} se unió a este servidor el ${member.joinedAt}.`,
                'fr': `${user.username} a rejoint ce serveur le ${member.joinedAt}.`,
                'ja': `${user.username} は ${member.joinedAt} にこのサーバーに参加しました。`,
            };
            await interaction.reply(
                locales[interaction.locale] ??
                `${user.username} entrou neste servidor em ${member.joinedAt}.`
            );

        }

        else if ( subcommand === 'server'){
            await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} membros.`);
        }
    }
}