const Discord = require('discord.js');

module.exports = {
    name: 'poll',
    description: 'Create a poll for users to vote',
    args: true,
    usage: '<poll message>',
    cooldown: 60,
    async execute(message, args) {

        // only "manage server" users can use this command
        if (!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send("Insufficient permissions to run this command!");

        const poll = new Discord.MessageEmbed()
            .setTitle(`Poll by ${message.author.username}`)
            .setColor(`rgb(66, 245, 158)`)
            .setFooter("React to vote!")
            .setDescription(args.join(' '));

        let msg = await message.channel.send(poll);

        // react
        await msg.react("✅");
        await msg.react("❎");

        // delete original message
        message.delete();
    }
}