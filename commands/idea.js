const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'idea',
    description: 'Out of ideas? I can give you one!',
    async execute(message, args) {
        let thisthat = await fetch("http://itsthisforthat.com/api.php?json");
        thisthat = await thisthat.json();
        let thiss = thisthat.this;
        let that = thisthat.that;
        const idea = new Discord.MessageEmbed()
            .setTitle("Idea!!!")
            .setColor("rgb(0, 0, 0)")
            .setDescription(`**${thiss}** for **${that}**`);

        message.channel.send(`**IDEA!** ${thiss} *for* ${that}`);
    }
}