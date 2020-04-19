const Discord = require("discord.js");

var xkcd = require("xkcd");

module.exports = {
  name: "xkcd",
  description: "Get the latest comic from XKCD!",
  execute(message, args, prefix) {
    var num, title, img, alt;

    xkcd(function(data) {
      console.log(data);
      num = data.num;
      title = data.title;
      img = data.img;
      alt = data.alt;

      let newtitle = "xkcd #" + num + " | " + title;

      const xkcdEmbed = new Discord.RichEmbed()
        .setColor(`RANDOM`)
        .setTitle(newtitle)
        .setImage(img)
        .addField("Alt Text", alt);

      message.channel.send(xkcdEmbed);
    });
  }
};
