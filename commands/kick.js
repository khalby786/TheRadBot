const Discord = require("discord.js");

module.exports = {
  name: "kick",
  description: "Kick a user from the guild.",
  args: true,
  usage: '<user to be kicked>',
  execute(message, args) {
    if (message.member.hasPermission("KICK_MEMBERS")) {
      const member = message.mentions.members.first();
      member.kick();
      message.channel.send("SUCCESSFULLY KICKED USER!");
    } else {
      message.reply("Insufficient permissions!")
    }
  }
};
