const Discord = require('discord.js');
const fetch = require('node-fetch');

const token = "8316f6c1";

module.exports = {
    name: 'movie',
    description: 'Get information on a movie or TV series.',
    args: true,
    usage: '<movie name>',
    async execute(message, args) {
        let name = message.content.match(/(?<=movie ).*$/)[0];
        const loadingmsg = await message.channel.send("**Fetching movie info...**");
        fetch(`http://www.omdbapi.com/?t=${name}&apikey=8316f6c1&plot=full`)
            .then(res => res.json())
            .then(data => {
                loadingmsg.delete();
                const movie = new Discord.MessageEmbed()
                    .setTitle(data.Title + " (" + data.Year + ")")
                    .setColor("#50E3C2")
                    .setThumbnail(data.Poster)
                    .addField("Plot", data.Plot || "*Not available*")
                    .addField("**Rated**", data.Rated || "*Not available*", true)
                    .addField("**Released**", data.Released || "*Not available*", true)
                    .addField("**Runtime**", data.Runtime || "*Not available*", true)
                    .addField("**Genre**", data.Genre || "*Not available*", true)
                    .addField("**Director**", data.Director || "*Not available*", true)
                    .addField("**Writer**", data.Writer || "*Not available*", true)
                    .addField("**Actors**", data.Actors || "*Not available*", true)
                    .addField("**Language**", data.Language || "*Not available*", true)
                    .addField("**Country**", data.Country || "*Not available*", true)
                    .addField("**Awards**", data.Awards || "*No awards yet!*", true)
                    .addField("**Metascore**", data.Metascore || "*Not available*", true)
                    .addField("**IMDB Rating**", data.imdbRating || "*Not available*", true);
                message.channel.send(movie);
            })
    }
}