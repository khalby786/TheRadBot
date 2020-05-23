const endb = require('endb');
const Discord = require('discord.js');

const logs = new endb("sqlite://logsconfig.sqlite");

module.exports = {
    name: 'logs',
    description: 'Toggle logs on and off.',
    async execute(message, args) {
        let author = message.author.username;
        let guildowner = message.guild.owner.user.username;
        if (author === guildowner || message.author.id === '634701839983706112') {
            if (!await logs.has(message.guild.id)) {
                await logs.set(message.guild.id, false);
            }
            let value = await logs.get(message.guild.id);
            if (value === true) {
                await logs.set(message.guild.id, false);
                message.reply("logs turned off!");
            } else {
                await logs.set(message.guild.id, true);
                message.reply("logs turned on!");
            }
        } else {
            message.reply("you do not have sufficient permissions to run this command!");
        }
    }
}