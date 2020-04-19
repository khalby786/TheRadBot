// defining port as per Glitch standards
const port = process.env.PORT || 80;

// express initialisation, although it is unnecessary
const express = require("express");
const app = express();

// Endb to store all my prefixes in a SQLite databse
var Endb = require("endb");
var prefixdb = new Endb("sqlite://prefix.sqlite");
var pointsdb = new Endb("sqlite://points.sqlite");

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

const request = require("request");

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
  // ignore message if author is a bot
  if (message.author.bot) return;

  let guildid = message.guild.id;
  console.log(guildid);

  // get message author's id
  let user = message.author.id;
  console.log(user);

  // let all = await pointsdb.all();
  // console.log(all);

  var key = guildid + "_" + user;

  // check if the db has the user
  let hasuser = await pointsdb.has(key);
  console.log("User? " + hasuser);

  if (!hasuser) {
    // create a new entry in the database for the user with default values
    let userobj = { user: { xp: 1, lvl: 1 } };
    let newuser = await pointsdb.set(key, userobj);
    console.log(newuser);
    // return;
  }

  // else get the current xp and level of user
  let userinfo = await pointsdb.get(key);
  let xp = userinfo.user.xp;
  let lvl = userinfo.user.lvl;

  // add new xp
  xp = xp + 5;
  let userobj = { user: { xp: xp, lvl: lvl } };
  let setvalue = await pointsdb.set(key, userobj);

  // a maximum limit for the xps in a particular level
  let xplimit = lvl * lvl + 30;

  // progress to the next level
  if (xp > xplimit) {
    xp = 0;
    xplimit = lvl * lvl + 30;
    lvl++;
    message.reply(`you've progressed to Level ${lvl}! Isn't that awesome?`);
    userobj = { user: { xp: xp, lvl: lvl } };
    setvalue = await pointsdb.set(key, userobj);
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
  console.log(prefix);

  if (!message.content.startsWith(prefix)) return;

  // get the arguments of the message by triming
  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  if (!client.commands.has(commandName)) return;
  const command = client.commands.get(commandName);

  // check for args
  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage of this command is: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  // some commands I don't feel like adding to the command handler
  if (message.content.startsWith(prefix + "points")) {
    message.channel.send(`
**XP** 
[${xp}/${xplimit}]

**Level**
[${lvl}]`);
  } else if (message.content.startsWith("prefixhelp")) {
    let prefix = await prefixdb.get(guildid);
    message.reply("current prefix of this bot in this server is " + prefix);
  } else {
    try {
      command.execute(message, args, prefix);
    } catch (e) {
      console.error(e);
    }
  }
});

// See if anyone is joining the server
client.on("guildMemberAdd", member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === "logs");
  if (!channel) return;
  let date = new Date();
  console.log(member);
  channel.send(`\`${date}\` 
 \`#${member.user.username}\` has joined the server!
`);
});

client.on("guildMemberRemove", member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === "logs");
  if (!channel) return;
  let date = new Date();
  console.log(member);
  channel.send(`\`${date}\` 
 \`#${member.user.username}\` has left the server!
`);
});

client.on("guildMemberUpdate", function(oldMember, newMember){
  const channel = client.channels.cache.find(ch => ch.name === "logs");
  if (!channel) return;
  let date = new Date();
  console.log(oldMember.roles.cache.filter(r => r.id !== oldMember.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "No Roles")
  const changesEmbed = new Discord.MessageEmbed()
    .setTitle(`Guild Member Updated!`)
    .setColor('RED')
    .addField(`Old Username`, `${oldMember.user.username}`, true)
    .addField(`New Username`, `${newMember.user.username}`, true)
    .addField('\u200B', '\u200B')    
    .addField(`Old Nickname`, `${oldMember.nickname}`, true)
    .addField(`New Nickname`, `${newMember.nickname}`, true)
    .addField('\u200B', '\u200B')  
    .addField(`Old Roles`, `${oldMember.roles.cache.filter(r => r.id !== oldMember.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "No Roles"}`)
    .addField(`New Roles`, `${newMember.roles.cache.filter(r => r.id !== newMember.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "No Roles"}`)
 
  
  channel.send(changesEmbed);
  // channel.send(`\`${date}\` 
  // \`#${member.user.username}\` has left the server!
  // `);
});


client.on("channelCreate", channel => {
  const log = client.channels.cache.find(channel => channel.name === "logs");
  if (!log) return;
  let date = new Date();
  log.send(`\`${date}\` 
New channel \`#${channel.name}\` created!
`);
});

client.on("channelDeleted", channel => {
  const log = client.channels.cache.find(channel => channel.name === "logs");
  if (!log) return;
  let date = new Date();
  log.send(`\`${date}\`
Channel \`#${channel.name}\` deleted!
`);
});

client.on("channelUpdate", function(oldChannel, newChannel) {
  const log = client.channels.cache.find(channel => channel.name === "logs");
  if (!log) return;
  let date = new Date();
  log.send(`\`${date}\`
Channel \`#${oldChannel.name}\` updated!
`);
});

client.on("disconnect", function(event) {
  const log = client.channels.cache.find(channel => channel.name === "logs");
  if (!log) return;
  let date = new Date();
  log.send(
    `\`${date}\`
The WebSocket has been closed and will no longer attempt to reconnect`
  );
});

client.on("emojiCreate", function(emoji) {
  const log = client.channels.cache.find(channel => channel.name === "logs");
  if (!log) return;
  let date = new Date();
  log.send(`\`${date}\`
New emoji created!`);
});

client.on("emojiDelete", function(emoji) {
  const log = client.channels.cache.find(channel => channel.name === "logs");
  if (!log) return;
  let date = new Date();
  log.send(`\`${date}\`
Emoji deleted!`);
});

client.on("emojiUpdate", function(oldEmoji, newEmoji) {
  const log = client.channels.cache.find(channel => channel.name === "logs");
  if (!log) return;
  let date = new Date();
  log.send(`\`${date}\`
Emoji updated!`);
});

client.on("messageUpdate", function(oldMessage, newMessage) {
  const log = client.channels.cache.find(channel => channel.name === "logs");
  if (!log) return;
  let date = new Date();
  if (oldMessage.content === newMessage.content) {
    return;
  } else {
    log.send(`\`${date}\`
**OLD MESSAGE**: ${oldMessage.content}
**NEW MESSAGE**: ${newMessage.content}`);
  }
});

client.on("guildBanAdd", function(guild, user){
  const log = client.channels.cache.find(channel => channel.name === "logs");
  if (!log) return;
  let date = new Date();
  console.log(`a member is banned from a guild`);
  log.send(`\`${date}\`
${user} has been banned from ${guild}`);
});

client.on("guildBanRemove", function(guild, user){
  const log = client.channels.cache.find(channel => channel.name === "logs");
  if (!log) return;
  let date = new Date();
  console.log(`a member is banned from a guild`);
  log.send(`\`${date}\`
${user} has been unbanned from ${guild}`);
});

client.on("guildCreate", function(guild){
  const log = client.channels.cache.find(channel => channel.name === "logs");
  if (!log) return;
  let date = new Date();
  log.send(`\`${date}\`
Client has joined ${guild}`);
});

client.login(process.env.DISCORD_BOT_TOKEN);

// Just a Glitch tool
const listener = app.listen(port, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
