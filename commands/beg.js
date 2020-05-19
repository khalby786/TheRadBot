const Discord = require('discord.js');
const endb = require('endb');
const coins = new endb("sqlite://coins.sqlite");

module.exports = {
  name: 'beg',
  description: 'Beg for coins.',
  cooldown: 2000,
  async execute(message, args) {
    let has = await coins.has(message.author.id);
    if (!has) {
      await coins.set(message.author.id, 0);
    } 
    const begarray = [
      { action: "Some stranger gave you **10** coins.", coins: 10 },
      { action: "@khalby786 gave you **50** coins.", coins: 50 },
      { action: "Nothing, dude. Nothing.", coins: 0 },
      { action: "**15** coins fell from the sky.", coins: 15 },
      { action: "You find **32** coins in the street.", coins: 32 },
      { action: "*Wakanda forever!* Black Panther gives you **50** coins for loyalty.", coins: 50 },
      { action: "BINGO! You get **10,000** coins.", coins: 10000 },
      { action: "Happy birthday, collect **20** coins.", coins: 20 },
      { action: "You win a music contest, you get **100** coins.", coins: 100 },
      { action: "You win a hackathon, you get **1000** coins.", coins: 1000 },
      { action: "You runner-up a hackathon, and you get **500** coins.", coins: 500 }
    ];
    let decision = begarray[Math.floor(Math.random() * begarray.length)];
    message.channel.send(decision.action);
    let domath = await coins.get(message.author.id) + decision.coins;
    await coins.set(message.author.id, domath);
  }
}