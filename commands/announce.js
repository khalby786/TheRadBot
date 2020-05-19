const Discord = require("discord.js");

module.exports = {
  name: "announce",
  description: "Announces <MESSAGE> in an embed to the current channel.",
  args: true,
  cooldown: 5,
  usage: '<message>',
  execute(message, args, prefix) {
    if (message.guild.id === "698841420412354581") {
      if (
        message.member.roles.some(role => role.name === "TEAM ADMIN") ||
        message.member.roles.some(role => role.name === "TEAM MEMBERS") ||
        message.member.roles.some(role => role.name === "SERVER MODS")
      ) {
        let announcemessage = message.content.match(/(?<=announce ).*$/)[0];
        console.log(announcemessage);

        message.delete(100);

        const announceEmbed = new Discord.MessageEmbed()
          .setColor("#ff1233")
          .setTitle("Boss Announcement!")
          .setDescription("@everyone, " + announcemessage);

        //Send the message to a designated channel on a server:
        let channel = message.guild.channels.cache.find(
          ch => ch.name === "announcements"
        );
        //   // Do nothing if the channel wasn't found on this server
        if (!channel) return;

        channel.send(announceEmbed);

        channel = message.guild.channels.cache.find(
          ch => ch.name === "general"
        );

        if (!channel) return;

        channel.send(announceEmbed);
      } else {
        message.channel.send(
          "You do not have sufficient permissions to run this command!"
        );
      }
    } else if (message.guild.id === "663380850280366081") {
      if (message.member.roles.some(role => role.name === "BOSS")) {
        console.log("Itzdeluxboy_!");

        let announcemessage = message.content.match(/(?<=announce ).*$/)[0];
        console.log(announcemessage);

        message.delete(100);

        const announceEmbed = new Discord.MessageEmbed()
          .setColor("#ff1233")
          .setTitle("Boss Announcement!")
          .setDescription("@everyone, " + announcemessage);

        message.channel.send(announceEmbed);
      } else if (
        message.member.roles.cache.some(role => role.name === "DEVELOPER")
      ) {
        console.log("khalby786");

        let announcemessage = message.content.match(/(?<=announce ).*$/)[0];
        console.log(announcemessage);

        message.delete(100);

        const announceEmbed = new Discord.MessageEmbed()
          .setColor("#ff1233")
          .setTitle("Announcement!")
          .setDescription("@everyone, " + announcemessage);

        message.channel.send(announceEmbed);
      } else {
        message.channel.send(
          "You do not have sufficient permissions to run this command."
        );
      }
    } else {
      if (message.author.username === message.guild.owner.user.username) {
        let announcemessage = message.content.match(/(?<=announce ).*$/)[0];
        console.log(announcemessage);

        message.delete();

        const announceEmbed = new Discord.MessageEmbed()
          .setColor("#ff1233")
          .setTitle("Announcement!")
          .setDescription("@everyone, " + announcemessage);

        message.channel.send(announceEmbed);
      } else {
        message.channel.send(
          "You do not have sufficient permissions to run this command!"
        );
      }
    }
  }
};
