const { SlashCommandBuilder, MessageFlags, ChannelType, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
            .setName('imprimir')
    .setNameLocalizations({
        'en-US': 'echo',
        'es-ES': 'eco',
        'fr': 'echo',
        'ja': 'エコー'
    })
    .setDescription('Responde o que você escreveu!')
    .setDescriptionLocalizations({
        'en-US': 'Replies with your input!',
        'es-ES': '¡Responde con lo que escribiste!',
        'fr': 'Répond avec ce que vous avez écrit !',
        'ja': '入力に応答します！'
    })
    .addStringOption(option =>
        option.setName('texto')
            .setNameLocalizations({
                'en-US': 'input',
                'es-ES': 'entrada',
                'fr': 'entrée',
                'ja': '入力'
            })
            .setDescription('O texto que vai ser imprimido')
            .setDescriptionLocalizations({
                'en-US': 'The input to echo back',
                'es-ES': 'El texto que se devolverá',
                'fr': 'Le texte à répéter',
                'ja': 'エコーする入力テキスト'
            })
            .setRequired(true)
    )
    .addBooleanOption(option =>
        option.setName('temporario')
            .setNameLocalizations({
                'en-US': 'ephemeral',
                'es-ES': 'efímero',
                'fr': 'éphémère',
                'ja': '一時的'
            })
            .setDescription('Opção para tornar a mensagem do bot temporária ou não')
            .setDescriptionLocalizations({
                'en-US': 'Whether or not the echo should be ephemeral',
                'es-ES': 'Si la respuesta debe ser efímera o no',
                'fr': 'Si la réponse doit être éphémère ou non',
                'ja': '返信を一時的にするかどうか'
            })
            .setRequired(true)
    )
    .addChannelOption(option =>
        option.setName('canal')
            .setNameLocalizations({
                'en-US': 'channel',
                'es-ES': 'canal',
                'fr': 'canal',
                'ja': 'チャンネル'
            })
            .setDescription('Escolhe o canal que vai ser imprimido o texto')
            .setDescriptionLocalizations({
                'en-US': 'The channel to echo into',
                'es-ES': 'El canal donde se enviará el texto',
                'fr': 'Le canal où le texte sera envoyé',
                'ja': 'テキストを表示するチャンネル'
            })
            .addChannelTypes(ChannelType.GuildText)
    ),

    async execute(interaction){
        const userInput = interaction.options.getString('texto');
        const isEphemeral = interaction.options.getBoolean('temporario') ?? false;
        const channel = interaction.options.getChannel('canal');
        
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
