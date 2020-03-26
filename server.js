const port = process.env.PORT || 80;

const express = require("express");
const app = express();

const cmd = require("node-cmd");

app.post('/git', (req, res) => {
  // If event is "push"
  if (req.headers['x-github-event'] == "push") {
    cmd.run('chmod 777 git.sh'); /* :/ Fix no perms after updating */
    cmd.get('./git.sh', (err, data) => {  // Run our script
      if (data) console.log(data);
      if (err) console.log(err);
    });
    cmd.run('refresh');  // Refresh project
  
    console.log("> [GIT] Updated with origin/master");
  }
  return res.sendStatus(200); // Send back OK status
});

const fs = require("fs");
const fetch = require("node-fetch");

var GphApiClient = require("giphy-js-sdk-core");
var giphy = GphApiClient('yDPZ11efwCaXrOn3F0j2ZQSCH8xkMwEX');

const Endb = require("endb");
const prefixdb = new Endb("sqlite://prefix.sqlite");

const request = require("request");
const apiLimit = 5;

function soRandom(items) {
  return Math.floor(Math.random() * items);
}

// For UptimeRobot to get a OK status
app.get("/", (request, response) => {
  response.sendStatus(200);
});

const Discord = require("discord.js");
const client = new Discord.Client();

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

function getSubstringIndex(str, substring, n) {
  var times = 0,
    index = null;
  while (times < n && index !== 1) {
    index = str.indexOf(substring, index + substring.length);
    times++;
  }
  return index;
}

// All the commands!
client.on("message", async message => {

  let author = message.author;
  let guildid = message.guild.id;
  let content = message.content;
  let date = new Date();

  if (message.author.bot) {
    // do nothing
  } else {
    console.log("Author: " + author);
    console.log("Guild ID: " + guildid);
    console.log("Message : " + content);
    console.log("Date: " + date);
    console.log(" ");
  }

  var prefix;

  var has = await prefixdb.has(guildid);

  if (has === false) {
    prefix = "!";
  } else {
    prefix = await prefixdb.get(guildid);
  }

  // client.user.setActivity("ROBLOX");

  if (message.author.bot) return;

  /* var args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();*/

  // Exit and stop if the prefix is not there or if user is a bot

  const args = message.content.trim().split(/ +/g);

  if (message.content.startsWith(prefix + "djs")) {
    client.commands.get("djs").run(message, args);
  }

  if (message.content.includes(prefix + "knock knock")) {
    client.commands.get("jokes").execute(message, args);
  }

  if (message.content.startsWith(prefix + "foot")) {
    client.commands.get("foot").execute(message, args);
  }
  
  if (message.content.startsWith(prefix + "xkcd")) {
    client.commands.get("xkcd").execute(message, args);
  }

  if (message.content.startsWith(prefix + "meme")) {
    client.commands.get("meme").execute(message, args);
  }

  if (message.content.startsWith("prefixhelp")) {
    message.channel.send("Current prefix: `" + prefix + "`");
  }

  if (message.content.startsWith(prefix + "who is the boss?")) {
    if (guildid === "687929303165435991") {
      message.channel.send("Oh, it's the great @khalby786!");
    } else {
      let owner = message.guild.owner;
      message.channel.send(`Oh, it's the great ${owner}!`);
    }
  }

  if (message.content.startsWith(prefix + "who made you?")) {
    message.channel.send(
      "I was made by the great web developer, Khaleel Gibran!"
    );
  }
  if (message.content.startsWith(prefix + "who is yedu?")) {
    if (guildid === "663380850280366081") {
      message.channel.send(
        "Oh, It's the Lightning Gamer!!! He is Smoking Hot, Beware of Him!"
      );
    }
  }

  if (message.content.startsWith(prefix + "announce")) {
    client.commands.get("announce").execute(message, args);
  }

  if (message.content.startsWith(prefix + "help")) {
    client.commands.get("help").execute(message, args, prefix);
  }

  if (message.content.startsWith(prefix + "userinfo")) {
    client.commands.get("userinfo").execute(message, args);
  }

  if (message.content.startsWith(prefix)) {
    client.commands.get("math").execute(message, args, prefix);
  }

  if (message.content.startsWith(prefix + "server")) {
    console.log(message.guild);
    let guild = message.guild;
    let name = guild.name;
    let id = guild.id;
    let region = guild.region;
    let members = guild.memberCount;
    let owner = guild.ownerID;
    let icon = `https://cdn.discordapp.com/icons/{guild.id}/{guild.icon}.png`;

    const server = new Discord.RichEmbed()
      .setColor('#ffff00')
      .setTitle(name)
      .setThumbnail(icon)
      .addField("Guild ID", id)
      .addField("Server Region", region)
      .addField("Member Count", members)
      .addField("Guild Owner", "@" + owner);

    message.channel.send(server);
  }

  if (message.content.startsWith(prefix + "prefix")) {
    let newprefix = message.content.match(/(?<=prefix ).*$/)[0];
    let author = message.author.username;
    let guildowner = message.guild.owner.user.username;
    console.log(typeof author);
    console.log(typeof guildowner);
    console.log(author.username);
    console.log("owner" + guildowner);
    if (author === guildowner) {
      console.log("Guild owner: " + guildowner);
      console.log("Msg Author: " + author);
      let setprefix = await prefixdb.set(guildid, args);
      let prefix = await prefixdb.get(guildid);
      console.log("New prefix :" + prefix);
      message.channel.send("@TheRadBot's prefix has been set to " + prefix);
    } else {
      message.channel.send(
        "You do not have sufficient permissions to run this command!"
      );
    }
  }
  // A command for getting my ping
  if (message.content.startsWith(prefix + "ping")) {
    client.commands.get("ping").execute(message, args);
  }

  if (message.content.startsWith(prefix + "text2png")) {
    client.commands.get("text2png").execute(message, args);
  }

  if (message.content.startsWith(prefix + "giphy")) {
    let gifQuery = message.content.match(/(?<=giphy ).*$/)[0];

    message.delete(100);

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

  if (message.content.startsWith(prefix + "clear")) {
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
      message.channel.fetchMessages().then(
        function(list) {
          message.channel.bulkDelete(list);
        },
        function(err) {
          message.channel.send("ERROR: ERROR CLEARING CHANNEL.");
        }
      );
    } else {
      message.channel.send(
        "You do not have sufficient permissions to run this command!"
      );
    }
  }
});

client.on("guildMemberAdd", member => {
  //Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(
    ch => ch.name === "member-log"
  );
  //   // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  const joinembed = new Discord.RichEmbed()
    .setColor("#008000")
    .setTitle(`${member} has joined!`);

  channel.send(joinembed);
});

client.login(process.env.DISCORD_BOT_TOKEN);

// Just a Glitch tool
const listener = app.listen(port, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
