const Discord = require('discord.js');
const endb = require('endb');
const coins = new endb("sqlite://coins.sqlite");

module.exports = {
  name: 'coins',
  description: 'Get the nummber of coins you have.',
  async execute(message, args) {
    let has = await coins.has(message.author.id);
    if (!has) {
      await coins.set(message.author.id, 0);
    } 
    message.channel.send('**Coins** ' + await coins.get(message.author.id) + " coins");
  }
}