const Discord = require("discord.js");

module.exports = {
  name: "clear",
  description: "",
  execute(message, args) {
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
};
