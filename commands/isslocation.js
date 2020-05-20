const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'isslocation',
    description: 'Get the current location in space of the **International Space Station**',
    async execute(message, args) {
        const loadingmsg = await message.channel.send("**Fetching International Space Station's location...**")
        fetch("http://api.open-notify.org/iss-now.json")
            .then(response => response.json())
            .then(data => {
                loadingmsg.delete();
                const isspos = new Discord.MessageEmbed()
                    .setTitle("International Space Station")
                    .setDescription("My position in space!!!")
                    .addField("**Longitude**", "`" + data.iss_position.longitude + "`", true)
                    .addField("**Latitude**", "`" + data.iss_position.latitude + "`", true)
                    .addField("*Timestamp*", "`" + new Date(data.timestamp * 1000) + "`", true);
                message.channel.send(isspos);
            })
    }
}