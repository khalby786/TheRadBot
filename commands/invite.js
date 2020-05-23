const Discord = require('discord.js');

module.exports = {
    name: 'invite',
    description: 'Invite me to some servers!',
    execute(message, args) {
        message.reply("invite me ==> https://discord.com/api/oauth2/authorize?client_id=664778959480815616&permissions=16121415&scope=bot")
    }
}