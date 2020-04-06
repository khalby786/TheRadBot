const Discord = require("discord.js");

var Endb = require("endb");
var prefixdb = new Endb("sqlite://prefix.sqlite");

module.exports = {
  name: "prefix",
  description: "",
  async execute(message, args) {
    let guildid = message.guild.id;
    let newprefix = args;
    let author = message.author.username;
    let guildowner = message.guild.owner.user.username;
    if (author === guildowner) {
      let setprefix = await prefixdb.set(guildid, args[1]);
      let prefix = await prefixdb.get(guildid);
      console.log("New prefix :" + prefix);
      message.channel.send("@TheRadBot's prefix has been set to " + prefix);
    } else {
      message.channel.send(
        "You do not have sufficient permissions to run this command!"
      );
    }
  }
};
