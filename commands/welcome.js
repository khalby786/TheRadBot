const Discord = require('discord.js');
const endb = require('endb');
const welcome = new endb("sqlite://welcomeconfig.sqlite");

module.exports = {
    name: 'welcome',
    description: 'Toggle welcome message of TheRadBot on and off.',
    async execute(message, args) {
        let author = message.author.username;
        let guildowner = message.guild.owner.user.username;
        if (author === guildowner || message.author.id === '634701839983706112') {
            if (!await welcome.has(message.guild.id)) {
                await welcome.set(message.guild.id, false);
            }
            let value = await welcome.get(message.guild.id);
            if (value === true) {
                await welcome.set(message.guild.id, false);
                message.reply("welcome message turned off!");
            } else {
                await welcome.set(message.guild.id, true);
                message.reply("welcome message turned on!");
            }
        } else {
            message.reply("you do not have sufficient permissions to run this command!");
        }
    }
}