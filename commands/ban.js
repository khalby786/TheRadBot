const Discord = require("discord.js");

module.exports = {
  name: "ban",
  description: "Ban a user from the guild",
  args: true,
  usage: '<user to be banned>',
  execute(message, args) {
    if (message.member.hasPermission("BAN_MEMBERS")) {
      const user = message.mentions.users.first();
      if (!message.guild.member(user).bannable) return message.reply('you can\'t ban this user because the bot doesn\'t have sufficient permissions!');
      message.guild.members.ban(user);
      message.channel.send("SUCCESSFULLY BANNED USER!");
    } else {
      message.reply("Insufficient permissions!")
    }
  }
};
