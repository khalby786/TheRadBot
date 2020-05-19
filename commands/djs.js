const fetch = require("node-fetch"); // npm i node-fetch
const qs = require("querystring"); // npm i querystring
const versions = [
  "stable",
  "master",
  "rpc",
  "commando",
  "akairo",
  "akairo-master",
  "11.5-dev"
];

module.exports = {
  name: "djs",
  description:
    "Searches the Discord.js documentation based on the search term. Used as a developer tool.",
  aliases: ["documentation", "search", "library"],
  usage: "<query> (branch)",
  category: "library",
  args: true,
  cooldown: 5,
  async execute (message, args, prefix) {
    const { channel, client, author } = message;
    let source = versions.includes(args.slice(-1)[0]) ? args.pop() : "stable";
    // if (source === "11.5-dev")
    //  source = `https://raw.githubusercontent.com/discordjs/discord.js/docs/${source}.json`;
    let q = args.join(" ");
    const queryString = qs.stringify({ src: source, q: q });
    const embed = await (await fetch(
      `https://djsdocs.sorta.moe/v2/embed?${queryString}`
    )).json();
    if (!embed)
      return channel.send(
        "Failed to locate that information in the documentation."
      );

    channel
      .send({ embed })
      .then(async m => {
        await m.react("🗑️");
        const filter = (reaction, user) =>
          reaction.emoji.name === "🗑️" && user.id === author.id;
        const collector = m.createReactionCollector(filter, {
          max: 1,
          time: 5000
        });

        collector.on("collect", data => {
          if (data.size) m.delete();
        });
        collector.on("end", data => {
          if (!data.size) m.clearReactions();
        });
      })
      .catch(() => {});
  }
};
