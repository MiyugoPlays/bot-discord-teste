const { SlashCommandBuilder, MessageFlags } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('gif')
        .setDescription('Sends a random gif!')
        .addStringOption(option =>
            option.setName('category')
                .setDescription('The gif category')
                .setRequired(true)
                .addChoices(
                    { name: 'Funny', value: 'gif_funny' },
                    { name: 'Meme', value: 'gif_meme' },
                    { name: 'Movie', value: 'gif_movie' },
                    { name: 'Sanrio', value: 'gif_sanrio' },
                    { name: 'Kamen rider', value: 'gif_kr' },
                    { name: 'Uma musume', value: 'gif_uma' },
                )
        )
        .addBooleanOption(option =>
            option.setName('ephemeral')
                .setDescription('Whether or not the echo should be ephemeral')
                .setRequired(true)
        ),
        
    async execute(interaction) {
        const category = interaction.options.getString('category');
        const isEphemeral = interaction.options.getBoolean('ephemeral') ?? false;
        

        const gifs = {
            gif_funny: 'https://c.tenor.com/7TZMsBpTg8AAAAAC/tenor.gif',
            gif_meme: 'https://c.tenor.com/31044VVA7iMAAAAd/tenor.gif',
            gif_movie: 'https://c.tenor.com/0i2STPNl0GMAAAAd/tenor.gif',
            gif_sanrio: 'https://c.tenor.com/k8cHPsSqimQAAAAC/tenor.gif',
            gif_kr: 'https://c.tenor.com/B3JcquMOrjYAAAAd/tenor.gif',
            gif_uma: 'https://c.tenor.com/jSBOen8Ps_YAAAAC/tenor.gif',
        
        }

        const selectedGif = gifs[category];


        let replyOptions = {
            content: selectedGif
        }

        if (isEphemeral){
                    replyOptions.flags = MessageFlags.Ephemeral
                }

        await interaction.reply(
            replyOptions
        )
    }
}

