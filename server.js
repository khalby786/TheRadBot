// defining port as per Glitch standards
const port = process.env.PORT || 80;

// env file
require('dotenv').config()

// express initialisation, although it is unnecessary
const express = require("express");
const app = express();

// Endb to store all my prefixes in a SQLite databse
var Endb = require("endb");
var prefixdb = new Endb("sqlite://prefix.sqlite");
var pointsdb = new Endb("sqlite://points.sqlite");
var level = new Endb("sqlite://levelconfig.sqlite");
var welcome = new Endb("sqlite://welcomeconfig.sqlite");
var logs = new Endb("sqlite://logsconfig.sqlite");

async function cleardb() {
  let clear = await pointsdb.clear();
  let clear2 = await pointsdb.clear();
}

// cleardb()

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

// ytdl-core
const ytdl = require("ytdl-core");

// For UptimeRobot to get a OK status
app.get("/", (request, response) => {
  response.sendStatus(200);
});

// defining a command handler
const Discord = require("discord.js");
const client = new Discord.Client();

// for music
global.queue = new Map();

client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

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

client.on("ready", () => {
  client.user.setActivity(`${client.users.cache.size} users | !help`, { type: "WATCHING" });
});

// All the commands!
client.on("message", async message => {

    client.user.setActivity(`${client.users.cache.size} users | !help`, { type: "WATCHING" });

  // ignore message if author is a bot
  if (message.author.bot) return;

  global.guildid = message.guild.id;

  // get message author's id
  let user = message.author.id;

  var key = guildid + "_" + user;

  if (await level.get(guildid) === true) {

    // check if the db has the user
    let hasuser = await pointsdb.has(key);

    if (!hasuser) {
      // create a new entry in the database for the user with default values
      let userobj = { user: { xp: 1, lvl: 1 } };
      let newuser = await pointsdb.set(key, userobj);
      // return;
    }

    // else get the current xp and level of user
    let userinfo = await pointsdb.get(key);
    var xp = userinfo.user.xp;
    var lvl = userinfo.user.lvl;

    // add new xp
    xp = xp + 5;
    let userobj = { user: { xp: xp, lvl: lvl } };
    let setvalue = await pointsdb.set(key, userobj);

    // a maximum limit for the xps in a particular level
    var xplimit = lvl * lvl + 30;

    // progress to the next level
    if (xp > xplimit) {
      xp = 0;
      xplimit = lvl * lvl + 30;
      lvl++;
      message.reply(`you've progressed to Level ${lvl}! Isn't that awesome?`);
      userobj = { user: { xp: xp, lvl: lvl } };
      setvalue = await pointsdb.set(key, userobj);
    }
  }

  let author = message.author;
  let content = message.content;
  let date = new Date();

  let prefix;

  // check if the db has a prefix with that guild
  var has = await prefixdb.has(guildid);
  console.log("Prefix? " + has);

  if (has === false) {
    let prefix = await prefixdb.set(guildid, "!");
    return;
  }

  // already there
  prefix = await prefixdb.get(guildid);

  if (message.content.startsWith("prefixinfo")) {
    let prefix = await prefixdb.get(guildid);
    message.reply("current prefix of this bot in this server is " + prefix);
  }

  if (!message.content.startsWith(prefix)) return;

  // get the arguments of the message by triming
  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  if (!client.commands.has(commandName)) return;
  const command = client.commands.get(commandName);
  console.log("command:");
  console.log(commandName);

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(
          1
        )} more second(s) before reusing the \`${command.name}\` command.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  // check for args
  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage of this command is: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  try {
    command.execute(message, args, prefix, client, xplimit, xp, lvl, queue);
  } catch (e) {
    console.error(e);
  }
});


// a small canvas modifier code
// https://discordjs.guide/popular-topics/canvas.html#adding-in-text

const applyText = (canvas, text) => {
  const ctx = canvas.getContext('2d');

  // Declare a base size of the font
  let fontSize = 70;

  do {
    // Assign the font to the context and decrement it so it can be measured again
    ctx.font = `${fontSize -= 10}px sans-serif`;
    // Compare pixel width of the text to the canvas minus the approximate avatar size
  } while (ctx.measureText(text).width > canvas.width - 300);

  // Return the result to use in the actual canvas
  return ctx.font;
};

// See if anyone is joining the server
client.on("guildMemberAdd", async member => {
  if (await logs.get(member.guild.id) === true) {
    const channel = member.guild.channels.cache.find(ch => ch.name === "logs");
    if (!channel) return;
    let date = new Date();
    console.log(member);
    channel.send(`\`${date}\` 
 \`#${member.user.username}\` has joined the server!
`);
  }

  if (await welcome.get(member.guild.id) === true) {
    const general = member.guild.channels.cache.find(ch => ch.name === 'general');
    if (!general) return;

    const Canvas = require('canvas');

    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('https://cdn.glitch.com/419b9a7b-abcb-4730-839d-9d43a909c9ab%2Fteamdonut.png?v=1589551172638');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Slightly smaller text placed above the member's display name
    ctx.font = '28px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

    // Add an exclamation point here and below
    ctx.font = applyText(canvas, `${member.displayName}!`);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
    ctx.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

    general.send(`Welcome to the server, ${member}!`, attachment);
  }

});

client.on("guildMemberRemove", async member => {
  if (await logs.get(member.guild.id) === true) {
    const channel = member.guild.channels.cache.find(ch => ch.name === "logs");
    if (!channel) return;
    let date = new Date();
    console.log(member);
    channel.send(`\`${date}\` 
 \`#${member.user.username}\` has left the server!
`);
  }
});

client.on("guildMemberUpdate", async function (oldMember, newMember) {
  if (await logs.get(oldMember.guild.id) === true) {
    const channel = oldMember.guild.channels.cache.find(ch => ch.name === "logs");
    if (!channel) return;
    let date = new Date();

    const changesEmbed = new Discord.MessageEmbed()
      .setTitle(`Guild Member Updated!`)
      .setColor("YELLOW")
      .setThumbnail(oldMember.user.displayAvatarURL({ format: 'jpg' }));

    if (oldMember.user.username !== newMember.user.username) {
      changesEmbed.addField(`**Username changed!**`, `\`${oldMember.user.username}\` ----> \`${newMember.user.username}\``)
    }
    if (oldMember.nickname !== newMember.nickname) {
      changesEmbed.addField(`**Nickname changed!**`, `\`${oldMember.nickname}\` ----> \`${newMember.nickname}\``)
    }


    // If the role(s) are present on the old member object but no longer on the new one (i.e role(s) were removed)
    const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
    if (removedRoles.size > 0) {
      console.log(`The roles ${removedRoles.map(r => r.name)} were removed from ${oldMember.displayName}.`);
      changesEmbed.addField(`:wrench: **Roles have been removed**`, ` \`${removedRoles.map(r => r.name)}\` from ${oldMember.displayName}`)
    }
    // If the role(s) are present on the new member object but are not on the old one (i.e role(s) were added)
    const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
    if (addedRoles.size > 0) {
      console.log(`The roles ${addedRoles.map(r => r.name)} were added to ${oldMember.displayName}.`);
      changesEmbed.addField(`:wrench: **Roles have been added**`, ` \`${addedRoles.map(r => r.name)}\` from ${oldMember.displayName}`)
    }

    channel.send(changesEmbed);
  }
});

client.on("channelCreate", async channel => {
  if (await logs.get(channel.guild.id) === true) {
    const log = channel.guild.channels.cache.find(
      channel => channel.name === "logs"
    );
    if (!log) return;
    let date = new Date();
    log.send(`\`${date}\` 
:new: New channel \`#${channel.name}\` created!
`);
  }
});

client.on("channelDeleted", async channel => {
  if (await logs.get(channel.guild.id) === true) {
    const log = channel.guild.channels.cache.find(
      channel => channel.name === "logs"
    );
    if (!log) return;
    let date = new Date();
    log.send(`\`${date}\`
Channel \`#${channel.name}\` deleted!
`);
  }
});

client.on("channelUpdate", async function (oldChannel, newChannel) {
  if (await logs.get(oldChannel.guild.id) === true) {
    const log = newChannel.guild.channels.cache.find(
      channel => channel.name === "logs"
    );
    if (!log) return;
    let date = new Date();
    log.send(`\`${date}\`
:tools: Channel \`#${oldChannel.name}\` updated!
`);
  }
});

client.on("disconnect", async function (event) {
  if (await logs.get(event.guild.id) === true) {
    const log = client.channels.cache.find(channel => channel.name === "logs");
    if (!log) return;
    let date = new Date();
    log.send(
      `\`${date}\`
The WebSocket has been closed and will no longer attempt to reconnect`
    );
  }
});

client.on("emojiCreate", async function (emoji) {
  if (await logs.get(emoji.guild.id) === true) {
    const log = emoji.guild.channels.cache.find(
      channel => channel.name === "logs"
    );
    if (!log) return;
    let date = new Date();
    log.send(`\`${date}\`
:smiley: New emoji created!`);
  }
});

client.on("emojiDelete", async function (emoji) {
  if (await logs.get(emoji.guild.id) === true) {
    const log = emoji.guild.channels.cache.find(
      channel => channel.name === "logs"
    );
    if (!log) return;
    let date = new Date();
    log.send(`\`${date}\`
:cry: Emoji deleted!`);
  }
});

client.on("emojiUpdate", async function (oldEmoji, newEmoji) {
  if (await logs.get(oldEmoji.guild.id) === true) {
    const log = oldEmoji.guild.channels.cache.find(
      channel => channel.name === "logs"
    );
    if (!log) return;
    let date = new Date();
    log.send(`\`${date}\`
:smile: Emoji updated!`);
  }
});

client.on("messageUpdate", async function (oldMessage, newMessage) {
  if (await logs.get(oldMessage.guild.id) === true) {
    if (oldMessage.guild.id === '703854911779110912') {
      // do nothing
    } else {
      const log = newMessage.channel.guild.channels.cache.find(
        channel => channel.name === "logs"
      );
      if (!log) return;
      let date = new Date();
      if (oldMessage.content === newMessage.content) {
        return;
      } else {
        log.send(`\`${date}\`
:writing_hand: **OLD MESSAGE**: ${oldMessage.content}
:writing_hand: **NEW MESSAGE**: ${newMessage.content}`);
      }
    }
  }
});

client.on("guildBanAdd", async function (guild, user) {
  if (await logs.get(guild.id) === true) {
    const log = client.channels.cache.find(channel => channel.name === "logs");
    if (!log) return;
    let date = new Date();
    console.log(`a member is banned from a guild`);
    log.send(`\`${date}\`
:hammer: ${user} has been banned from ${guild}`);
  }
});

client.on("guildBanRemove", async function (guild, user) {
  if (await logs.get(guild.id) === true) {
    const log = client.channels.cache.find(channel => channel.name === "logs");
    if (!log) return;
    let date = new Date();
    console.log(`a member is banned from a guild`);
    log.send(`\`${date}\`
:hammer: ${user} has been unbanned from ${guild}`);
  }
});

// client.on("guildCreate", function(guild){
//   const log = client.channels.cache.find(channel => channel.name === "logs");
//   if (!log) return;
//   let date = new Date();
//   log.send(`\`${date}\`
// Client has joined ${guild}`);
// });

// safety token
client.login(process.env.TOKEN);

// Just a Glitch tool
const listener = app.listen(port, function () {
  console.log("~ Logged in as TheRadBot!")
  console.log("~ Listening hard on port " + listener.address().port);
});
