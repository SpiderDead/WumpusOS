exports.run = (client, message) => {
    const fs = require('fs');

    fs.readFile('./data/playerData.json', (err, pd) => {
        if (err) {
            console.log('[WumpusOS] Something went wrong. Ignoring...');
            return;
        }

        const playerData = JSON.parse(pd);

        if (playerData !== undefined) {

            const playerDataSorted = playerData.sort((a,b) => (a.currency > b.currency) ? 1 : ((b.currency > a.currency) ? -1 : 0)).reverse();

            let leaderboardMessage = 'Current leaderboard:\n';

            playerDataSorted.forEach((val, key) => {
                leaderboardMessage += `${key+1}. ${message.guild.members.find(m => m.id === val.userid).displayName} - ${val.currency}\n`;
            });

            message.channel.send(leaderboardMessage).catch(console.error);

        }else{
            message.channel.send("Couldn't find systems... That is odd...").catch(console.error);
        }
    });

};