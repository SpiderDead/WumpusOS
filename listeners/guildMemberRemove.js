exports.run = (client, member) => {
    const fs = require('fs');

    fs.readFile('./data/playerData.json', (err, pd) => {
        if (err) throw err;

        //get playerData of player
        const playerData = JSON.parse(pd);
        const player = playerData.find(id => id.userid === member.id);

        if (player !== undefined) {

            //Remove channel
            member.guild.channels.find(c => c.id === player.channelid).delete("[WumpusOS] Member left");

            //Remove player from the data
            const index = playerData.indexOf(player);

            if (index > -1) {
                playerData.splice(index, 1);
            }

            fs.writeFile("./data/playerData.json", JSON.stringify(playerData), (err) => {
                if (err) throw err;
            });
            console.log('[WumpusOS] system ' + player.gameid + ' got removed! It was not the one...');
        }else{
            console.log('[WumpusOS] That is strange... I could not find the system in the playerData. Ignoring...');
        }
    });
};