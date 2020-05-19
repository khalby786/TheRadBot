// under construction :)hello hi!

const Discord = require("discord.js");
const fs = require("fs");
var text2png = require("text2png");

module.exports = {
  name: "text2png",
  description: "Converts text to PNG!",
  execute(message, args, prefix) {
    // let file = args[1] + ".png";
    let text = args[2];
    let color = args[1];

    console.log("1: " + args[1]);
    console.log("2: " + args[2]);
    console.log("3: " + args[3]);

    console.log(text);
    console.log(color);

    fs.writeFileSync("image.png", text2png(text, { color: color }));
    const png = new Discord.RichEmbed()
      .setColor(`RANDOM`)
      .attachFiles("image.png")
      .setImage("attachment://image.png");

    message.channel.send(png);
  }
};
