const Discord = require("discord.js");

module.exports = {
  name: "ping",
  description: "Ping!",
  execute(message, args) {
    var ping = Date.now() - message.createdTimestamp + " ms";

    const timerEmbed = new Discord.RichEmbed()
      .setColor("#660066")
      //.setTitle("Your Ping")
      .addField("Your Ping", ping);

    // message.channel.sendMessage("Your ping is `" + `${Date.now() - message.createdTimestamp}` + " ms`");
    message.channel.send(timerEmbed);
    message.client.user.setActivity("I'M A TIMER!!!");
  }
};
