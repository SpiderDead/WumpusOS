exports.run = (client, message, args) => {
    const fs = require('fs');

    if (args[0] != null){
        fs.readFile('./data/playerData.json', (err, pd) => {
            if (err) {
                console.log('[WumpusOS] Something went wrong. Ignoring...');
                return;
            }

            const playerData = JSON.parse(pd);

            //get playerData of target
            const target = playerData.find(id => id.gameid === args[0]);

            //get playerData of target
            const attacker = playerData.find(id => id.userid === message.author.id);

            if (target !== undefined) {

                const targetchannel = message.guild.channels.find(c => c.id === target.channelid);
                targetchannel.overwritePermissions(message.author.id, {
                        VIEW_CHANNEL: true,
                        SEND_MESSAGES: true,
                        READ_MESSAGE_HISTORY: false
                    }).catch(console.error);
                targetchannel.send("System " + attacker.gameid + " has connected!").catch(console.error);

                message.channel.send("Connecting...").catch(console.error);

                console.log('[WumpusOS] system ' + attacker.gameid + ' connected to ' + target.gameid + ' :eyes:');
            }else{
                message.channel.send("System not responding...").catch(console.error);
            }
        });
    }else{
        message.channel.send("IP invalid or not found.").catch(console.error);
    }
};