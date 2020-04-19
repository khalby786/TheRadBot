# TheRadBot

A simple Discord bot that cannot play music, say jokes, post memes and do math calculations!

*The prefix must be typed before all the commands for it to work. Use the `prefixinfo` command  (without the prefix) to know the current prefix of the bot.*

## Using This Bot

To invite your bot to your server, click [here](https://discordapp.com/api/oauth2/authorize?client_id=664778959480815616&permissions=0&scope=bot).

For this bot to work properly, the server must have the following text channels:
* general
* announcements
* member-log


## Commands

### Info

| Command | Description | Optional Argument(s) | Required Argument(s) |
|----------|-------------|-------------------|--------------------|
| help     | Shows all the commands of this bot. | *None* | *None* |
| prefixinfo | Gives you the current prefix of the bot. | *None* | *None* |
| ping | Gives your ping! | *None* | *None* |
| userinfo | Get a user's information. | *None* | *None* |

### Talk

| Command | Description | Optional Argument(s) | Required Argument(s) |
|----------|-------------|-------------------|--------------------|
| who is the boss? | This command will let you know who is the boss of this server! | *None* | *None* |
| who made you? | It wil show who made TheRadBot! Make sure to check it out! | *None* | *None* |
| foot | It is waste... | *None* | *None* |

### Fun

| Command | Description | Optional Argument(s) | Required Argument(s) |
|----------|-------------|-------------------|--------------------|
| knock knock joke | This command will give you a random stupid knock joke! | *None* | *None* |
| giphy <SEARCH_TERM> | Gives you a random GIF according to the search term. | *None* | SEARCH_TERM is the keyword with which GIFs are searched.   |
| <MATH_EXPRESSION> | No keyword, and a mathematical expression followed by the prefix. | *None* | The MATH_EXPRESSION, of course! |
| xkcd | Get the latest comic from XKCD! | *None* | *None* |
| meme | Gives a random meme! | *None* | *None* |

### Reference 

| Command | Description | Optional Argument(s) | Required Argument(s) |
|----------|-------------|-------------------|--------------------|
| djs <SEARCH_TERM> | Searches the Discord.js documentation based on the search term. Used as a developer tool. | *None* | SEARCH_TERM is the keyword with which the documentation is searched |

### Special Commands

These commands can only be used by server/guild owners or with certain permissions as mentioned.

| Command | Description | Optional Argument(s) | Required Argument(s) |
|----------|-------------|-------------------|--------------------|
| prefix <NEW_PREFIX> | Changes the prefix of the bot to <NEW_PREFIX> | *None* | NEW_PREFIX, which is the new prefix of the bot. |
| announce <MESSAGE> | Announces <MESSAGE> in an embed to the current channel. | *None* | MESSAGE, which is announced to a channel named `general` and `announcements`. |
  
#### TODO
  
* Add music functionality
* Add argument for `help` command to know more about each command
* Add option to get XKCD comic by comic number
* Add Wikipedia package
