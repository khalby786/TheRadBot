const Discord = require('discord.js');
const { version } = require('discord.js');
var cpuStat = require('cpu-stat');
const fs = require('fs');

module.exports = {
    name: 'systeminfo',
    description: 'Provides info on bot statistics and system information.',
    execute(message, args, prefix, client) {
        const os = require('os');
        const arch = os.arch()
        const used = process.memoryUsage().heapUsed / 1024 / 1024;

        let totalSeconds = process.uptime();
        let realTotalSecs = Math.floor(totalSeconds % 60);
        let days = Math.floor((totalSeconds % 31536000) / 86400);
        let hours = Math.floor((totalSeconds / 3600) % 24);
        let mins = Math.floor((totalSeconds / 60) % 60);

        cpuStat.usagePercent(function (err, percent, seconds) {
            if (err) {
                return catchErr(err, message);
            }

            fs.readdir("./commands/", (err, files) => {

                let jsfile = files.filter(f => f.split(".").pop() === "js");
                if (jsfile.length <= 0) {
                    return;
                }

                let embed = new Discord.MessageEmbed()
                    .setAuthor(`${client.user.username}'s Bot Stats and Info`, client.user.avatarURL)
                    .setThumbnail(client.user.avatarURL())
                    .setColor("ORANGE")
                    .addField("**Uptime**", `Days: ${days} | Hours: ${hours} | Minutes: ${mins} | Seconds: ${realTotalSecs}`, true)
                    .addField("**CPU Usage**", `${percent.toFixed(2)}%`, true)
                    .addField("**Memory Usage**", `${Math.round(used * 100) / 100} MB`, true)
                    .addField("**Server Count**", client.guilds.cache.size, true)
                    .addField("**Member Count**", client.users.cache.size, true)
                    .addField("**Channel Count**", client.channels.cache.size, true)
                    .addField("**Node**", '`' + process.version + '`', true)
                    .addField("**Discord.js**", `\`v${version}\``, true)
                    .addField("**Commands**", jsfile.length + 8, true)
                    .addField("**Platform**", os.platform, true)
                    .addField("**ARCH**", arch, true);
                message.channel.send(embed);
            })
        })
    }
}