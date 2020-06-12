const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'httpcat',
    description: 'Get a cat\'s image for a particular status code.',
    args: true,
    cooldown: 20,
    usage: '<status code>',
    async execute(message, args) {
        message.channel.send(`https://http.cat/${args}`)
    }
}