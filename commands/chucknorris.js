const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'chucknorris',
    description: 'Gets a random Chuck Norris joke.',
    async execute(message, args) {
        const msg = await message.channel.send("**Chuck Norris is looking for a joke...**")
        const data = await fetch('https://api.chucknorris.io/jokes/random');
        const res = await data.json();
        msg.delete();
        const joke = new Discord.MessageEmbed()
        .setTitle("**Chuck Norris Joke**")
        .setThumbnail(res.icon_url)
        .setDescription(res.value);
        message.channel.send(joke);
    }
}