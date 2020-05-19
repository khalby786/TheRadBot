const Discord = require("discord.js");

module.exports = {
  name: "serverinfo",
  description: "Know more about the current server.",
  cooldown: 3,
  execute(message, args, prefix) {
    
    const verlvl = {
      "NONE": "None",
      "LOW": "Low",
      "MEDIUM": "Medium",
      "HIGH": "High\n(╯°□°）╯︵ ┻━┻",
      "VERY_HIGH": "Very High\n(ノಠ益ಠ)ノ彡┻━┻"
    };
    
    let inline = true;
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setThumbnail(sicon)
      .setAuthor(message.guild.name)
      .addField("Name", message.guild.name, inline)
      .addField("ID", message.guild.id, inline)
      .addField("Owner", message.guild.owner, inline)
      .setThumbnail(message.guild.iconURL())
      .addField("Region", message.guild.region, inline)
      .addField(
        "Verification Level",
        verlvl[message.guild.verificationLevel],
        inline
      )
      .addField("Members", `${message.guild.memberCount}`, inline)
      .addField("Roles", message.guild.roles.cache.size, inline)
      .addField("Channels", message.guild.channels.cache.size, inline)
      .setFooter(`Created ${message.guild.createdAt}`)
      .setTimestamp();

    message.channel.send(serverembed);
  }
};
