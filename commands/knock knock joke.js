const Discord = require("discord.js");

module.exports = {
  name: "jokes",
  description: "This command will give you a random stupid knock joke!",
  cooldown: 5,
  execute(message, args, prefix) {
    var jokes = [
      { name: "Dozen", answer: "anybody want to let me in?No,Ok:(" },
      { name: "Avenue", answer: "knocked on this door before?" },
      { name: "Ice Cream", answer: "if you let me in!" },
      { name: "Adore", answer: "is between us. Open up!" },
      { name: "Lettuce", answer: "in. Its cold out here!" },
      { name: "Bed", answer: "you can not guess who I am." },
      { name: "Al", answer: "give you a kiss if you open the door." },
      { name: "Abby", answer: "birthday to you!" },
      { name: "Rufus", answer: "the most important part of your house." },
      { name: "Cheese", answer: "a cute girl." },
      { name: "Wanda", answer: "hang out with me right now?" },
      {
        name: "Ho-ho.",
        answer: "You know, your Santa impression could use a little work."
      },
      { name: "Mary and Abbey.", answer: "Mary Christmas and Abbey New Year!" },
      { name: "Carmen", answer: "let me in already!" },
      { name: "TANK", answer: "You're Welcome!" },
      { name: "HAWAII", answer: "I'm fine,Hawaii you!" },
      { name: "Scold", answer: "outside—let me in!" },
      { name: "Robin", answer: "you! Hand over your cash!" },
      { name: "Irish", answer: "you a Merry Christmas!" },
      { name: "Otto", answer: "know whats taking you so long!" },
      { name: "Needle", answer: "little help gettin in the door." },
      { name: "Luke", answer: "through the keyhole to see!" },
      { name: "Justin", answer: "the neighborhood and thought Id come over." },
      { name: "Europe", answer: "No, you are a poo" },
      { name: "YEDU", answer: "HE SUCKS." },
      { name: "Etch", answer: "Bless You!" },
      { name: "Mikey", answer: "doesnt fit through this keyhole" }
    ];

    //Formatting the output to return in a new line and plug in the output variables
    function formatJoke(joke) {
      return [
        "Knock, knock.",
        "Who’s there?",
        joke.name + ".",
        joke.name + " who?",
        joke.name + " " + joke.answer
      ].join("\n");
    }

    //choosing a random joke from the array
    var knock = function() {
      var joke = jokes[Math.floor(Math.random() * jokes.length)];
      return formatJoke(joke);
    };

    message.reply(knock());
  }
};
