exports.run = (client, message) => {
    const args = message.content.split(/ +/g);
    const command = args.shift().toLowerCase();

    switch (command) {
        case 'help':
            const help = require('../commands/help.js');
            help.run(client, message, args, command);
            break;
        case 'ping':
            const ping = require('../commands/ping.js');
            ping.run(client, message, args, command);
            break;
        case 'connect':
            const connect = require('../commands/connect.js');
            connect.run(client, message, args, command);
            break;
        case 'disconnect':
            const disconnect = require('../commands/disconnect.js');
            disconnect.run(client, message, args, command);
            break;
        case 'leaderboard':
            const leaderboard = require('../commands/leaderboard.js');
            leaderboard.run(client, message, args, command);
            break;
    }
};
