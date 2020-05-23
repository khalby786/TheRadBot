// const Discord = require("discord.js");
// const ytdl = require("ytdl-core");
// const yts = require('yt-search')

// module.exports = {
//   name: "play",
//   description: "PLAY SOME MUSIC!!!",
//   args: true,
//   usage: "<song to play>",
//   async execute(message, args) {
//     if (message.channel.type !== "text") return;

//     const voiceChannel = message.member.voice.channel;

//     if (!voiceChannel) {
//       return message.reply("please join a voice channel first!");
//     }
    
//     const r = await yts(message.content.match(/(?<=play ).*$/)[0])

//     voiceChannel.join().then(connection => {
//       const stream = ytdl(r.videos[0].url, {
//         filter: "audioonly"
//       });
//       const dispatcher = connection.play(stream);

//       dispatcher.on("end", () => voiceChannel.leave());
//     });

//     const music = new Discord.MessageEmbed()
//       .setTitle("Now Playing " + r.videos[0].title)
//       .setColor("yellow")
//       .setThumbnail(r.videos[0].thumbnail)
//       .setDescription("**" + r.videos[0].description + "**", true)
//       .addField("**Duration**", r.videos[0].timestamp, true)

//     message.channel.send(music);
//   }
// };

const { Util } = require("discord.js");
const ytdl = require("ytdl-core");
const yts = require('yt-search');

module.exports = {
  name: "play",
  description: "Play a song in your channel!",
  args: true,
  usage: '<song name>',
  async execute(message, args, prefix, client, xplimit, xp, lvl, queue) {
    console.log(queue);
    try {
      const args = message.content.split(" ");
      global.queue = queue
      const serverQueue = queue.get(message.guild.id);

      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel)
        return message.channel.send(
          "You need to be in a voice channel to play music!"
        );
      const permissions = voiceChannel.permissionsFor(message.client.user);
      if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return message.channel.send(
          "I need the permissions to join and speak in your voice channel!"
        );
      }

      // const songInfo = await ytdl.getInfo(args[1]);

      const r = await yts(message.content.match(/(?<=play ).*$/)[0])

      const song = {
        title: r.videos[0].title,
        url: r.videos[0].url
      };

      if (!serverQueue) {
        const queueContruct = {
          textChannel: message.channel,
          voiceChannel: voiceChannel,
          connection: null,
          songs: [],
          volume: 5,
          playing: true
        };

        queue.set(message.guild.id, queueContruct);

        queueContruct.songs.push(song);

        try {
          var connection = await voiceChannel.join();
          queueContruct.connection = connection;
          this.play(message, queueContruct.songs[0]);
        } catch (err) {
          console.log(err);
          queue.delete(message.guild.id);
          return message.channel.send(err);
        }
      } else {
        serverQueue.songs.push(song);
        return message.channel.send(
          `${song.title} has been added to the queue!`
        );
      }
    } catch (error) {
      console.log(error);
      message.channel.send(error.message);
    }
  },

  play(message, song) {
    const guild = message.guild;
    const serverQueue = queue.get(message.guild.id);

    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }

    const dispatcher = serverQueue.connection
      .play(ytdl(song.url))
      .on("finish", () => {
        serverQueue.songs.shift();
        this.play(message, serverQueue.songs[0]);
      })
      .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Start playing: **${song.title}**`);
  }
};