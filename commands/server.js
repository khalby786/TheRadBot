const Discord = require("discord.js");

module.exports = {
  name: "server",
  description: "Know more about the current server.",
  execute(message, args) {
    console.log(message.guild);
    let guild = message.guild;
    let name = guild.name;
    let id = guild.id;
    let region = guild.region;
    let members = guild.memberCount;
    let owner = guild.ownerID;
    let icon = `https://cdn.discordapp.com/icons/{guild.id}/{guild.icon}.png`;

    const server = new Discord.RichEmbed()
      .setColor("#ffff00")
      .setTitle(name)
      .setThumbnail(icon)
      .addField("Guild ID", id)
      .addField("Server Region", region)
      .addField("Member Count", members)
      .addField("Guild Owner", "@" + owner);

    message.channel.send(server);
  }
};
