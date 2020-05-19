const Discord = require('discord.js');
const endb = require('endb');
const coins = new endb("sqlite://coins.sqlite");

module.exports = {
  name: 'give',
  description: 'Give some of your coins to a user.',
  // cooldown: 20,
  usage: '<amount of coins to give>',
  async execute(message, args) {
    if (!message.mentions.users.size) {
	    return message.reply('you need to tag a user in order to give them coins!');
    }
    let has = await coins.has(message.author.id);
    if (!has) {
      await coins.set(message.author.id, 0);
    }
    const taggedUser = message.mentions.users.first().id;
    let mycoins = await coins.get(message.author.id);
    if (mycoins < Number(args[0])) {
      message.reply("Insufficient funds!");
      return;
    }
    let domath = (await coins.get(taggedUser) || 0) + Number(args[0]);
    await coins.set(taggedUser, domath);
    // await coins.math(taggedUser, 'add', Number(args[0]));
    let anothermath = await coins.get(message.author.id) - Number(args[0]);
    console.log(anothermath);
    await coins.set(message.author.id, anothermath);
    // await coins.math(message.author.id, 'subtract', Number(args[0]));
    message.channel.send("Coins successfully sent!");
  }
}