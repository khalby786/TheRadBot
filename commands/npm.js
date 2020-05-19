const Discord = require("discord.js");
const libnpm = require("libnpm");

module.exports = {
  name: "npm",
  description: "Get information regarding an `npm` package.",
  args: true,
  cooldown: 3,
  async execute(message, args, prefix) {
    let repo = await libnpm.manifest(args[0]);

    var printObj = (obj) =>  {
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

    const npm = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setTitle(repo.name)
      .addField('**Install**', '```npm install ' + repo.name + '```')
      .addField("**Version**", repo.version)
      .addField("**Dependencies**", printObj(repo.dependencies) || "*No dependencies.*")
      .addField("**Developer Dependencies**", printObj(repo.devDependencies) || "*No developer dependencies.*")
      .addField("**Deprecated?**", repo.deprecated)
      .addField("**Package ID**", repo._id);

    message.channel.send(npm);

  }
};
