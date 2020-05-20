const Discord = require('discord.js');

module.exports = {
  name: 'username',
  description: 'Change my username',
  args: true,
  usage: '<new username>',
  cooldown: 30,
  execute (message, args, prefix, client) {
    client.user.setUsername(args[0]);
  }
}