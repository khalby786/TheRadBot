const Discord = require("discord.js");

module.exports = {
  name: "foot",
  description: "ball!",
  execute(message, args) {
    message.channel.send("ball!");
  }
};
