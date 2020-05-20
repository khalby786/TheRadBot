const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'advice',
    description: 'Get some advice when you need some advice.',
    async execute(message, args) {
        const loadingmsg = await message.channel.send("**Fetching advice for ya...**")
        fetch("https://api.adviceslip.com/advice")
            .then(response => response.json())
            .then(data => {
                loadingmsg.delete();
                message.channel.send("**Advice #" + data.slip.id + "**: " + data.slip.advice);
            })
    }
}