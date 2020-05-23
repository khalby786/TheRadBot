const Discord = require("discord.js");
const request = require("request");
const beautify = require("json-beautify");

module.exports = {
  name: "get",
  description: "Do a GET request!",
  args: true,
  usage: '<url for GET request>',
  cooldown: 10,
  execute(message, args, prefix) {
    console.log(args[0]);
    message.channel.send("**Fetching GET request...**")
    request(args[0], function(error, response, body) {
      console.error("error:", error); // Print the error if one occurred
      console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
      console.log("body:", body); // Print the HTML for the Google homepage.
      message.delete();
      if (
        response.headers["content-type"] == "application/json; charset=utf-8"
      ) {
        let newres = beautify(body, null, 2, 100);
        message.channel.send(response.statusCode, {
          code: true
        });
        message.channel.send(response.headers["content-type"], {
          code: true
        });
        message.channel.send(newres || "*No response*", {
          split: {
            char: '\n'
          },
          code: 'json'
        });
      } else if (
        response.headers["content-type"] == "text/html; charset=UTF-8"
      ) {
        // message.channel.send("```html" + "\n" + body + "\n" + "```");
        message.channel.send(response.statusCode, {
          code: true
        });
        message.channel.send(response.headers["content-type"], {
          code: true
        });
        message.channel.send(body || "*No response*", {
          split: {
            char: '\n'
          },
          code: 'html'
        });
      } else {
        message.channel.send(response.statusCode, {
          code: true
        });
        message.channel.send(response.headers["content-type"], {
          code: true
        });        
        message.channel.send(body || "*No response*", {
          split: {
            char: '\n'
          },
          code: true
        });
      }
    });
  }
};
