const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const yts = require('yt-search')

module.exports = {
  name: "pause",
  description: "Pause playing of music.",
  async execute(message, args) {
    if (message.channel.type !== "text") return;

    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) {
      return message.reply("please join a voice channel first!");
    }
    
    // const r = await yts(message.content.match(/(?<=play ).*$/)[0])

    // voiceChannel.join().then(connection => {
    //   const stream = ytdl(r.videos[0].url, {
    //     filter: "audioonly"
    //   });
    //   const dispatcher = connection.play(stream);

    //   dispatcher.on("end", () => voiceChannel.leave());
    // });

    voiceChannel.join().then(connection => {
        connection.disconnect();
    });
  }
};
