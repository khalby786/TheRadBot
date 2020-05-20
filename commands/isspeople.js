const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'isspeople',
    description: 'Get the number of people in space onboard the **International Space Station**',
    async execute(message, args) {
        const loadingmsg = await message.channel.send("**Fetching International Space Station's astronauts...**")
        fetch("http://api.open-notify.org/astros.json")
            .then(response => response.json())
            .then(data => {
                loadingmsg.delete();
                const isspos = new Discord.MessageEmbed()
                    .setTitle("International Space Station")
                    .setDescription("My astronauts!!!")
                    .addField("**No. of astronauts**", data.number)
                    
                for (let astro of data.people) {
                    isspos.addField("**Craft**", astro.craft, true);
                    isspos.addField("**Name**", astro.name, true);
                    isspos.addField("-----", "------")
                }

                message.channel.send(isspos);
            })
    }
}