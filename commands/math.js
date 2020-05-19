const Discord = require("discord.js");
const { evaluate } = require('mathjs');

module.exports = {
  name: "math",
  description: "Perform mathematical functions, evaluate expressions, and do basic unit conversion.",
  usage: "<math expression>",
  args: true,
  execute(message, args, prefix) {
    let exp = message.content.match(/(?<=math ).*$/)[0];
    let result = evaluate(exp);
    message.channel.send(result, {
      code: true
    })
  }
};
