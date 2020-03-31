const Discord = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "userinfo",
  description: "Know more about yourself and other users!",
  async execute(message, args) {
    let member = message.author;
    let user = member;
    console.log(user);
    const joinDiscord = moment(user.createdAt).format("llll");
    const joinServer = moment(user.joinedAt).format("llll");
    let embed = new Discord.RichEmbed()
      .setAuthor(
        user.username + "#" + user.discriminator,
        user.displayAvatarURL
      )
      .setDescription(`${user}`)
      .setColor(`RANDOM`)
      .setThumbnail(`${user.displayAvatarURL}`)
      .addField(
        "Joined at:",
        `${moment.utc(user.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`,
        true
      )
      .addField("Status:", user.presence.status, true)
      .addField(
        "Roles:",
        message.member.roles.map(r => `${r}`).join(" | "),
        true
      )
      .setFooter(`ID: ${user.id}`)
      .setTimestamp();

    message.channel.send({ embed: embed });
    return;
  }
};
