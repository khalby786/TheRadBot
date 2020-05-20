const Discord = require("discord.js");
var Endb = require('endb');
var pointsdb = new Endb("sqlite://points.sqlite");


module.exports = {
  name: "points",
  description: "Know your level and XP in the current server.",
  cooldown: 0,
  async execute(message, args, prefix) {
    let guildid = message.guild.id;
    console.log(guildid);
    let user = message.author.id;
    console.log(user);
    var key = guildid + "_" + user;
    let userinfo = await pointsdb.get(key);
    var xp = userinfo.user.xp;
    var lvl = userinfo.user.lvl;
    var xplimit = lvl * lvl + 30;
    message.channel.send(`
**XP** 
[${xp}/${xplimit}]

**Level**
[${lvl}]`);
  }
};
