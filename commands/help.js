const Discord = require("discord.js");

module.exports = {
  name: "help",
  description: "Shows all the commands of this bot.",
  usage: "(command name)",
  cooldown: 3,
  async execute(message, args, prefix) {
    console.log(args);
    if (args.length === 0 || args[0] === "" || args === undefined) {
      const helpEmbed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("TheRadBot v2.8")
        .setDescription(
          "The prefix must be typed before the command for it to work. Use the `prefixinfo` command to know the current prefix of the bot."
        );

      const helpInfo = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .addField(":flower_playing_cards: Fun", "`joke`, `chucknorris`, `giphy`, `xkcd`, `meme`, `advice`, `idea`, `httpcat`, `number`")
        .addField(":file_folder: Reference", "`djs`, `npm`, `get`, `movie`")
        .addField(":dollar: Economy", "`points`, `beg`, `coins`, `give`")
        .addField(":construction: Moderation", "`ban`, `kick`")
        .addField(":toolbox: Utility", "`help`, `invite`, `prefixinfo`, `ping`, `userinfo`, `serverinfo`, `systeminfo`, `color`, `weather`, `math`")
        .addField(":rocket: International Space Station *API*", "`isslocation`, `isspeople` ")
        .addField(":secret: Owner-only", "`prefix`, `announce`, `resetprefix`, `clear`, `ghostping`, `level`, `welcome`, `poll`")
        .setFooter("Requested by " + message.author.username, message.author.avatarURL());

      message.channel.send(helpEmbed);
      message.channel.send(helpInfo);
    } else {
      try {
        const command = require(`${__dirname}/${args}.js`);
      } catch {
        message.reply("Command not found!");
        return;
      }
      let arg, usage;
      const command = require(`${__dirname}/${args}.js`);
      if (command.args) {
        arg = "True";
      } else {
        arg = "False"
      }
      if (command.usage) {
        usage = command.usage
      } else {
        usage = "No usage specified."
      }
      const commandEmbed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle(`${prefix}${command.name}`)
        .setDescription(`${command.description}`)
        .addField("**Arguments**", arg)
        .addField("**Usage**", "`" + usage + "`")
        .addField("**Cooldown**", command.cooldown + "s")
        .setFooter("Requested by " + message.author.username, message.author.avatarURL());
      
      message.channel.send(commandEmbed);
      console.log(command);
    }
  }
};
