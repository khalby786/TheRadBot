const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'color',
    description: 'Get a random color along with RGB, HEX and other values.',
    cooldown: 5,
    async execute(message, args) {
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        let data = await fetch(`https://www.thecolorapi.com/id?hex=${randomColor}`);
        let res = await data.json();
        const color = new Discord.MessageEmbed()
            .setTitle(res.name.value)
            .setColor(res.hex.value)
            .setThumbnail(`http://singlecolorimage.com/get/${randomColor}/400x400`)
            .addField("**HEX**", "`" + res.hex.value + "`", true)
            .addField("**RGB**", "`" + res.rgb.value + "`", true)
            .addField("**HSL**", "`" + res.hsl.value + "`", true)
            .addField("**HSV**", "`" + res.hsv.value + "`", true)
            .addField("**CMYK**", "`" + res.cmyk.value + "`", true)
            .addField("**XYZ**", "`" + res.XYZ.value + "`", true)

        message.channel.send(color);
    }
}