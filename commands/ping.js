const Discord = require("discord.js");

module.exports = {
  name: "ping",
  description: "Gives your ping!",
  cooldown: 3,
  execute(message, args, prefix) {
    var ping = Date.now() - message.createdTimestamp + " ms";

    const timerEmbed = new Discord.MessageEmbed()
      .setColor("#660066")
      //.setTitle("Your Ping")
      .addField("Your Ping", ping);

    message.channel.send(timerEmbed);
  }
};
