const endb = require('endb');
const Discord = require('discord.js');

const level = new endb({
    adapter: "mongodb",
    uri: `${process.env.MONGODB_URI}levelconfig?retryWrites=true&w=majority`
});

module.exports = {
    name: 'level',
    description: 'Toggle leveling system on and off.',
    async execute(message, args) {
        let author = message.author.username;
        let guildowner = message.guild.owner.user.username;
        if (author === guildowner) {
            if (!await level.has(message.guild.id)) {
                await level.set(message.guild.id, false);
            }
            let value = await level.get(message.guild.id);
            if (value === true) {
                await level.set(message.guild.id, false);
                message.reply("Level and XP system turned off!");
            } else {
                await level.set(message.guild.id, true);
                message.reply("Level and XP system turned on!");
            }
        } else {
            message.reply("you do not have sufficient permissions to run this command!");
        }
    }
}