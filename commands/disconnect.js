exports.run = (client, message) => {
    const fs = require('fs');

    fs.readFile('./data/playerData.json', (err, pd) => {
        if (err) {
            console.log('[WumpusOS] Something went wrong. Ignoring...');
            return;
        }

        const playerData = JSON.parse(pd);

        //get playerData of attacker
        const attacker = playerData.find(id => id.userid === message.author.id);

        //get playerData of target
        const target = playerData.find(id => id.channelid === message.channel.id);

        if(attacker != null && target != null) {
            if (attacker.channelid !== message.channel.id) {

                message.channel.overwritePermissions(message.author.id, {
                    VIEW_CHANNEL: null,
                    SEND_MESSAGES: null,
                    READ_MESSAGE_HISTORY: null
                }).catch(console.error);
                message.channel.send("System " + attacker.gameid + " has disconnected!").catch(console.error);

                const attackerchannel = message.guild.channels.find(c => c.id === attacker.channelid);
                attackerchannel.send("Disconnected from " + target.gameid).catch(console.error);

                console.log('[WumpusOS] system ' + attacker.gameid + ' disconnected from ' + target.gameid);
            } else {
                message.channel.send("You can not disconnect your own system. You are forever in here :eyes:").catch(console.error);
            }
        } else {
            console.log('[WumpusOS] Something went wrong. Ignoring...');
        }
    });
};