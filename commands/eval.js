const Discord = require('discord.js');

const clean = text => {
    if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

module.exports = {
    name: 'eval',
    description: 'Only khalby786 can use this command.',
    execute(message, args) {
        if (message.author.id !== '634701839983706112') return;
        var code = message.content.match(/(?<=eval ).*$/)[0]
        try {
            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            message.channel.send("**Input**:");
            message.channel.send(code, { code: 'js', split: true });
            message.channel.send('**Output**:');
            message.channel.send(clean(evaled), { code: "xl", split: true });
        } catch (err) {
            message.channel.send("**Input**:");
            message.channel.send(code, { code: 'js', split: true });
            message.channel.send('**Output**:');
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
}