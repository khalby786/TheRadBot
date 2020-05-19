const Discord = require("discord.js");

module.exports = {
  name: "points",
  description: "Know your level and XP in the current server.",
  cooldown: 0,
  execute(message, args, prefix, xp, xplimit, lvl) {
    message.channel.send(`
**XP** 
[${xp}/${xplimit}]

**Level**
[${lvl}]`);
  }
};
