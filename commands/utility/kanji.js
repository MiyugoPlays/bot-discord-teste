const { SlashCommandBuilder } = require('discord.js');
const { createCanvas, registerFont } = require('canvas');
const path = require('path')

registerFont(path.join(__dirname, '../../fonts', 'NotoSerifJP-VariableFont_wght.ttf'), {
    family: 'Noto Serif JP',
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kanji')
        .setDescription('Mostra um kanji aleatório como imagem.'),

    async execute(interaction) {
        const kanji = ['日', '月', '水', '火', '木', '金', '土'][Math.floor(Math.random() * 7)];

        const canvas = createCanvas(300, 300);
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#000000';
        ctx.font = 'bold 200px "Noto Sans JP"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(kanji, canvas.width / 2, canvas.height / 2);

        const attachment = {
            files: [{ attachment: canvas.toBuffer(), name: 'kanji.png' }]
        }

        await interaction.reply(attachment);
    }
}

