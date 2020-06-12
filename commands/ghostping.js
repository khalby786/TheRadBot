const Discord = require("discord.js");

module.exports = {
  name: "ghostping",
  description: "Ping @everyone or a specific user secretly.",
  usage: "(user)",
  cooldown: 30,
  async execute(message, args, prefix) {
    if (args.length === 0 || args[0] === "" || args === undefined) {
        let author = message.author.username;
        let guildowner = message.guild.owner.user.username;
        if (author === guildowner || message.author.id === '634701839983706112') {
            const msg = await message.channel.send('@everyone');
            msg.delete();
            message.delete();
        }
    } else {
        let author = message.author.username;
        let guildowner = message.guild.owner.user.username;
        if (author === guildowner || message.author.id === '634701839983706112') {
            const msg = await message.channel.send(`@${args}`);
            msg.delete();
            message.delete();
        }
    }
  }
};
