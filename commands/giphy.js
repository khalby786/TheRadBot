const Discord = require("discord.js");

// giphy stuff for fetching gifs
var GphApiClient = require("giphy-js-sdk-core");
var giphy = GphApiClient(process.env.GIPHY_KEY);

function soRandom(items) {
  return Math.floor(Math.random() * items);
}

module.exports = {
  name: "giphy",
  description: "",
  execute(message, args) {
    let gifQuery = message.content.match(/(?<=giphy ).*$/)[0];

    message.delete(100);
    
    // api limit
    const apiLimit = 5;

    giphy
      .search("gifs", { q: gifQuery, limit: apiLimit })
      .then(giphyResponse => {
        let selectedGif =
          giphyResponse.data[soRandom(apiLimit)].images.original.url;

        message.channel.send(`Hey, check this out: ${selectedGif}`);
      })
      .catch(err => {
        message.channel.send(message, `Nah just try again!`);
      });
  }
};
