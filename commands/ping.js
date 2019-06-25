exports.run = (client, message) => {
    const fs = require('fs');

    fs.readFile('./data/playerData.json', (err, pd) => {
        if (err) throw err;

        //get playerData of player
        const playerData = JSON.parse(pd);

        let args = message.toString().split(" ");

        const player = playerData.find(x => x.gameid === args[1]);

        if (player !== undefined) {
            if (player.userid === message.author.id) {
                message.channel.send('Pinging.')
                    .then(msg => msg.edit('Pinging..', 500))
                    .then(msg => msg.edit('Pinging...', 500))
                    .then(msg => msg.edit('Reply from ' + args[1] + ': bytes=32 time=0ms TTL=' + (Math.floor(Math.random() * 80) + 20), 500))
                    .catch(console.error);
                return;
            }

            message.channel.send('Pinging.')
                .then(msg => msg.edit('Pinging..', 500))
                .then(msg => msg.edit('Pinging...', 500))
                .then(msg => msg.edit('Pinging.', 500))
                .then(msg => msg.edit('Reply from ' + args[1] + ': bytes=32 time=' + (Math.floor(Math.random() * 30) + 3) + 'ms TTL=' + (Math.floor(Math.random() * 80) + 20), 500))
                .catch(console.error);
        }else{
            message.channel.send('Pinging.')
                .then(msg => msg.edit('Pinging..', 500))
                .then(msg => msg.edit('Pinging...', 500))
                .then(msg => msg.edit('Timed out...', 500))
                .catch(console.error);
            console.log('[WumpusOS] That is strange... I could not find the system in the playerData. Ignoring...');
        }
    });
};
