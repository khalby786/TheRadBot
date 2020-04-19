const Discord = require("discord.js");

module.exports = {
  name: "help",
  description: "Shows all the commands of this bot.",
  async execute(message, args, prefix) {
    const helpEmbed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("TheRadBot v2.7")
      .setDescription(
        "The prefix must be typed before the command for it to work. Use the `prefixinfo` command to know the current prefix of the bot."
      );

    const helpInfo = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Info")
      .addField("1. `" + prefix + "help`", "Shows all the commands of this bot")
      .addField("2. `prefixinfo`", "Gives you the current prefix of the bot")
      .addField("3. `" + prefix + "ping`", "Gives your ping!")
      .addField("4. `" + prefix + "userinfo`", "Get a user's information");

    const helpTalk = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Talk")
      .addField(
        "1. `" + prefix + "who is the boss?`",
        "This command will let you know who is the boss of this server!"
      )
      .addField(
        "2. `" + prefix + "who made you?`",
        "It wil show who made TheRadBot! Make sure to check it out!"
      )
      .addField("3. `" + prefix + "foot`", "It is waste...");

    const helpFun = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Fun")
      .addField(
        "1. `" + prefix + "knock knock joke`",
        "This command will give you a random stupid knock joke!"
      )
      .addField(
        "2. `" + prefix + "giphy <SEARCH TERM>`",
        "Gives you a random GIF according to the search term. **Required argument:** <SEARCH TERM>"
      )
      .addField(
        "3. `" + prefix + "<MATH EXPRESSION>`",
        "Perform basic math operations. **Required argument**: <MATH EXPRESSION>"
      )
      .addField("4. `" + prefix + "xkcd`", "Latest comic from XKCD!")
      .addField("5. `" + prefix + "meme`", "Gives a random meme!");

    const helpRef = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Reference")
      .addField(
        "1. `" + prefix + "djs <SEARCH TERM>`",
        "Searches the Discord.js documentation based on the search term. **Required argument**: <SEARCH TERM>"
      );

    const helpSpec = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Special Commands")
      .setDescription("These commands can only be used by guild owners.")
      .addField(
        "1. `" + prefix + "prefix <NEW PREFIX>`",
        "Changes the prefix of the bot to <NEW PREFIX>. **Required argument**: <NEW PREFIX>"
      )
      .addField(
        "2. `" + prefix + "announce <MESSAGE>`",
        "Announces <MESSAGE> in an embed to the current channel. **Required argument**: <MESSAGE>"
      );

    message.channel.send(helpEmbed).then(message => {
      message.channel.send(helpInfo);
      message.channel.send(helpTalk);
      message.channel.send(helpFun);
      message.channel.send(helpRef);
      message.channel.send(helpSpec);
    });
  }
};
