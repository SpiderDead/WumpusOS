exports.run = (client, message) => {
    const fs = require('fs');

    fs.readFile('./data/playerData.json', (err, pd) => {
        if (err) throw err;

        //get playerData of player
        const playerData = JSON.parse(pd);
        const player = playerData.find(id => id.channelid === message.channel.id);

        if (player !== undefined) {
            const status = message.guild.members.find(m => m.id === message.member.id).presence.status;
            message.channel.send('System is currently ' + status).catch(console.error);
        }else{
            message.channel.send('Hmm. I could not find this node. Try again later.').catch(console.error);
            console.log('[WumpusOS] That is strange... I could not find the system in the playerData. Ignoring...');
        }
    });
};