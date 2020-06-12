const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'number',
    description: 'Get interesting facts on numbers!',
    args: true,
    cooldown: 20,
    usage: '<number>',
    async execute(message, args) {
        const msg = await message.channel.send("**Fetching fact...**")
        const data = await fetch(`http://numbersapi.com/${args}`);
        const res = await data.text();
        msg.delete();
        message.channel.send(`==> ${res}`);
    }
}