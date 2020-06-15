const Discord = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "userinfo",
  description: "Get a user's information.",
  cooldown: 3,
  async execute(message, args, prefix) {
    // let member = message.author;  
    let user = message.author;
    console.log("User info:");
    console.log(user);
    const joinDiscord = moment(user.createdAt).format("llll");
    const joinServer = moment(user.joinedAt).format("llll");
    let guildid = message.guild.id;
    let avatar = user.avatar;
    let iconurl = `https://cdn.discordapp.com/icons/${guildid}/${avatar}.webp`
    let embed = new Discord.MessageEmbed()
      .setAuthor(
        user.username + "#" + user.discriminator,
        user.displayAvatarURL
      )
      .setDescription(`${user}`)
      .setColor(`RANDOM`)
      .setThumbnail(`${message.author.avatarURL()}`)
      .addField(
        "Joined at:",
        `${moment.utc(user.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`,
        true
      )
      .addField("Status:", user.presence.status, true)
      .addField(
        "Roles:",
        `${message.member.roles.cache
          .filter(r => r.id !== message.guild.id)
          .map(roles => `\`${roles.name}\``)
          .join(" **|** ") || "No Roles"}`,
        true
      )
      .setFooter(`ID: ${user.id}`)
      .setTimestamp();
    
    message.channel.send({ embed: embed });
    return;
  }
};
