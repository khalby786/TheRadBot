const Discord = require("discord.js");

var Endb = require("endb");
var prefixdb = new Endb("sqlite://prefix.sqlite");

module.exports = {
  name: "prefix",
  description: "Changes the prefix of the bot to <NEW_PREFIX>",
  args: true,
  usage: "<new prefix>",
  cooldown: 10,
  async execute(message, args, prefix, client) {

    function emoji(id) {
      return client.emojis.get(id).toString();
    }
    

    let guildid = message.guild.id;
    let newprefix = args;
    let author = message.author.username;
    let guildowner = message.guild.owner.user.username;
    if (author === guildowner || message.author.id === '634701839983706112') {
      let setprefix = await prefixdb.set(guildid, args);
      let prefix = await prefixdb.get(guildid);
      console.log("New prefix :" + prefix);
      message.channel.send(emoji("705731347154599996") + " @TheRadBot's prefix has been set to " + prefix);
    } else {
      message.channel.send(
        "You do not have sufficient permissions to run this command!"
      );
    }
  }
};
