const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports = {
  name: "meme",
  description: "Gives a random meme!",
  cooldown: 5,
  execute(message, args, prefix) {
    const embed = new Discord.MessageEmbed();
    message.channel.send(embed.setDescription("Retrieving...")).then(m => {
      fetch("https://www.reddit.com/r/dankmemes.json")
        .then(res => res.json())
        .then(body => {
          const SafeHandler = message.channel.nsfw
            ? body.data.children
            : body.data.children.filter(post => !post.data.over_18);
          if (!SafeHandler.length || !body)
            return message.channel.send(
              embed
                .setColor("RED")
                .setDescription(`The post couldn't be found.`)
            );
          const number = Math.floor(Math.random() * SafeHandler.length);
          embed.setAuthor(SafeHandler[number].data.author);
          embed.setTitle(`**${SafeHandler[number].data.title}**`);
          embed.setURL(
            `https://reddit.com${SafeHandler[number].data.permalink}`
          );
          embed.setImage(SafeHandler[number].data.url);
          embed.setFooter(
            `👍 ${SafeHandler[number].data.ups} | 💬 ${SafeHandler[number].data.num_comments}`
          );
          m.delete().catch();
          message.channel.send(embed);
        });
    });
  }
};
