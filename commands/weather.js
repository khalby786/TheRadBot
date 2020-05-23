const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'weather',
    description: 'Get the weather of a place or city.',
    args: true,
    usage: '<city>',
    async execute(message, args) {
        let weather = await fetch(`https://api.weatherbit.io/v2.0/current?city=${args[0]}&key=${process.env.WEATHER}`);
        weather = await weather.json();
        weather = weather.data[0];

        const temp = new Discord.MessageEmbed()
            .setTitle("Current Weather for " + args[0])
            .setColor("GREEN")
            .setDescription(weather.weather.description)
            .addField("**Temperature**", weather.temp + "°C")
            .addField("**Feels like**", weather.app_temp + "°C")
            .addField("**Latitude**", "`" + weather.lat + "`", true)
            .addField("**Longitude**", "`" + weather.lon + "`", true)
            .addField("**Wind Speed**", weather.wind_spd + "m/s", true)
            .addField("**Wind Direction**", weather.wind_dir + "°", true)
            .addField("**Relative Humidity**", weather.rh + "%", true);

        message.channel.send(temp);
    }
}