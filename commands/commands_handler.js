exports.run = (client, message) => {
    const args = message.content.split(/ +/g);
    const command = args.shift().toLowerCase();

    switch (command) {
        case 'help':
            const help = require('../commands/help.js');
            help.run(client, message, args, command);
            break;
        case 'status':
            const status = require('../commands/status.js');
            status.run(client, message, args, command);
            break;
    }
};