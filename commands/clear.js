const Discord = require("discord.js");

module.exports = {
  name: "clear",
  description: "",
  args: true,
  usage: '<number of messages>',
  async execute(message, args, prefix) {
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
      let msg = message;
      await msg.channel.messages.fetch({ limit: args }).then(messages => {
        // Fetches the messages
        msg.channel.bulkDelete(
          messages // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
        );
      });
    } else {
      message.channel.send(
        "You do not have sufficient permissions to run this command!"
      );
    }
  }
};
