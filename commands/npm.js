const Discord = require("discord.js");
const libnpm = require("libnpm");
const fetch = require('node-fetch');

module.exports = {
  name: "npm",
  description: "Get information regarding an `npm` package.",
  args: true,
  cooldown: 3,
  async execute(message, args, prefix) {
    let repo = await libnpm.manifest(args[0]);

    var printObj = (obj) => {
      var string = "";

      for (var prop in obj) {
        if (typeof obj[prop] == "string") {
          string += '`' + prop + ": " + obj[prop] + "` ";
        } else {
          string += prop + ": { " + print(obj[prop]) + "}";
        }
      }

      return string;
    };

    let r = await fetch(`https://registry.npmjs.org/${repo.name}`);
    r = await r.json();
    let review = await fetch(`https://pkgreview.dev/api/v1/npm/${repo.name}`);
    review = await review.json();
    console.log(r);
    const npm = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setTitle(repo.name)
      .addField('**Install**', '```npm install ' + repo.name + '```')
      .addField('**Description**', r.description)
      .addField('**Homepage**', `[${r.homepage}](${r.homepage})`)
      .addField('**Repository**', `[${r.repository.url}](${r.repository.url})`)
      .addField("**Version**", repo.version)
      .addField("**Dependencies**", printObj(repo.dependencies) || "*No dependencies.*")
      .addField("**Developer Dependencies**", printObj(repo.devDependencies) || "*No developer dependencies.*")
      .addField("**Deprecated?**", repo.deprecated)
      .addField("**Pkgreview Reviews**", review.reviewsCount || "*Haven't been reviewed yet!*")
      .addField("**Pkgreview Rating**", review.starString || "*Haven't been reviewed yet!*")
      .addField("**Package ID**", repo._id);

    message.channel.send(npm);

  }
};
