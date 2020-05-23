module.exports = {
	name: 'stop',
	description: 'Stop all songs in the queue!',
	execute(message, args, queue) {
		console.log("QUEUE!!!")
		console.log(queue);
		const serverQueue = queue.get(message.guild.id);
		if (!message.member.voice.channel) return message.channel.send('You have to be in a voice channel to stop the music!');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end();
	},
};