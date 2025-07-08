const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        //await interaction.deferReply(); //deferReply serve pra mandar uma msg de delay pro discord pensar
        //await wait(4_000);              //ja o editReply edita o reply
        //await interaction.editReply('Pong!')


        await interaction.reply('Pongui!')
        await wait(2_000);
        await interaction.followUp({ content: 'Pong secreto (hoi)', flags: MessageFlags.Ephemeral }); //followup serve pra mandar uma mensagem logo em seguida
        //{ content: 'Pong secreto', flags: MessageFlags.Ephemeral } essa parte de ephemeral serve pra mandar msg unica pro user

        //await interaction.reply('Pongui');
        //await wait(2_000);
        //await interaction.deleteReply(); //deleta o reply

        //const response = await interaction.reply({ content: 'Pong!', withResponse: true })
        //console.log(response.resource.message); // basicamente com o withResponse vc tem um log do comando

        //await interaction.reply('Pongui!'); 
        //const message = await interaction.fetchReply();
        //console.log(message); //msm função que o anterior praticamente  
    },
};
