const Discord = require('discord.js');
const endb = require('endb');
const coins = new endb({
  adapter: "mongodb",
  uri: `${process.env.MONGODB_URI}coins?retryWrites=true&w=majority`
});

module.exports = {
  name: 'coins',
  description: 'Get the nummber of coins you have.',
  async execute(message, args) {
    let has = await coins.has(message.author.id);
    if (!has) {
      await coins.set(message.author.id, 0);
    } 
    const coinembed = new Discord.MessageEmbed()
    .setTitle(`${message.author.username}'s Global Coins`)
    .setColor('#eb7134')
    .setDescription(`${await coins.get(message.author.id)} coins`);

    message.channel.send(coinembed);
  }
}