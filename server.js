// defining port as per Glitch standards
const port = process.env.PORT || 80;

// express initialisation, although it is unnecessary
const express = require("express");
const app = express();

// Endb to store all my prefixes in a SQLite databse
var Endb = require("endb");
var prefixdb = new Endb("sqlite://prefix.sqlite");

// cmd and POST request to auto-update my Glitch project whenever a GitHub commit is made
const cmd = require("node-cmd");

app.post("/git", (req, res) => {
  // If event is "push"
  if (req.headers["x-github-event"] == "push") {
    cmd.run("chmod 777 git.sh"); /* :/ Fix no perms after updating */
    cmd.get("./git.sh", (err, data) => {
      // Run our script
      if (data) console.log(data);
      if (err) console.log(err);
    });
    cmd.run("refresh"); // Refresh project

    console.log("> [GIT] Updated with origin/master");
  }
  return res.sendStatus(200); // Send back OK status
});

// fs module for defining command handler
const fs = require("fs");
const fetch = require("node-fetch");

const request = require('request');

// For UptimeRobot to get a OK status
app.get("/", (request, response) => {
  response.sendStatus(200);
});

// defining a command handler
const Discord = require("discord.js");
const client = new Discord.Client();

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
  console.log("[Command] Loaded", command.name);
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

  // ignore message if author is a bot
  if (message.author.bot) return;
  
  var prefix;
  
  // check if the db has a prefix with that guild
  var has = await prefixdb.has(guildid);

  if (has === false) {
    prefix = "!";
    // default prefix
  } else {
    // already there 
    prefix = await prefixdb.get(guildid);
  }

  // get the arguments of the message by triming
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
    client.commands.get("server").execute(message, args);
  }

  if (message.content.startsWith("resetprefix")) {
    
  }

  if (message.content.startsWith(prefix + "prefix")) {
    client.commands.get("prefix").execute(message, args);    
  }
  // A command for getting my ping
  if (message.content.startsWith(prefix + "ping")) {
    client.commands.get("ping").execute(message, args);
  }

  if (message.content.startsWith(prefix + "text2png")) {
    client.commands.get("text2png").execute(message, args);
  }

  if (message.content.startsWith(prefix + "giphy")) {
    client.commands.get("giphy").execute(message, args);
  }

  if (message.content.startsWith(prefix + "clear")) {
    client.commands.get("clear").execute(message, args);
  }
});

// See if anyone is joining the server
client.on("guildMemberAdd", member => {
  //Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === "member-log");
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
