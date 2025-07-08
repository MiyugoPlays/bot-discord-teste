const { SlashCommandBuilder, MessageFlags, ChannelType, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Replies with your input!')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('the input to echo back')
                .setRequired(true)
        )
        .addBooleanOption(option =>
            option.setName('ephemeral')
                .setDescription('Whether or not the echo should be ephemeral')
                .setRequired(true)
        )
        .addChannelOption(option =>
            option.setName('channel')
            .setDescription('The channel to echo into')
            .addChannelTypes(ChannelType.GuildText)
        ),
    async execute(interaction){
        const userInput = interaction.options.getString('input');
        const isEphemeral = interaction.options.getBoolean('ephemeral') ?? false;
        const channel = interaction.options.getChannel('channel');
        
        const replyOptions = {
            content: '',
           
        }

        if (isEphemeral) {
            replyOptions.flags = MessageFlags.Ephemeral;
        }


        if (channel){
            const botMember = interaction.guild.members.me;
            const botPermissions = channel.permissionsFor(botMember);

            if (!botPermissions.has(PermissionsBitField.Flags.SendMessages)){
                return interaction.reply ({
                    content: 'Não tenho permissions to send a mensagem!',
                    flags: MessageFlags.Ephemeral
                })
            }

            await channel.send(`${interaction.user} Disse: ${userInput}`)

            replyOptions.content = `Mensagem enviada para ${channel}`
        } else {
            replyOptions.content = `Você disse: ${userInput}`;
        }

        await interaction.reply(
            replyOptions
        
        )


    }            
}   
