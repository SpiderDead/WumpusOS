exports.run = (client, member) => {
    const fs = require('fs');
    const config = require('../config.json');

    const randomIP = require('../utils/IP.js').generateIP();
    const randomIPdashed = randomIP.replace(/[.]/g, '_');

    if (!fs.existsSync('./data/playerData.json')) {
        console.log('[WumpusOS] PlayerData file not found. Creating one now...');
        fs.writeFile('./data/playerData.json', JSON.stringify([]), (err) => {
            if (err) throw err;
            console.log('[WumpusOS] PlayerData file created!');
        });

    }

    member.setNickname(randomIP).catch(console.error);
    member.guild.createChannel(randomIPdashed, { type: 'text'})
        .then(c => {
            c.setParent(config.node_category).catch(console.error);
            c.replacePermissionOverwrites({ overwrites: [
                    {
                        id: member.guild.id,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: member.id,
                        allow: ["VIEW_CHANNEL"]
                    }
                ]}).catch(console.error);

            fs.readFile('./data/playerData.json', (err, pd) => {
                if (err) throw err;
                const playerData = JSON.parse(pd);

                playerData.push({"userid": member.id, "gameid": randomIP, "channelid": c.id});

                fs.writeFile("./data/playerData.json", JSON.stringify(playerData), (err) => {
                    if (err) throw err;
                });
            });

            c.send('**Hello Stranger. Welcome to WumpusOS**\n\n' +
                'You are one of the many systems out here. Your goal is to survive. Other systems can break yours,' +
                ' but you can also break theirs...\n\n' +
                'I am Wumpus, your guide. I will learn you the basics of this game. Just type `help me wumpus` and ' +
                'I will instantly give you some basic commands and tutorials!\n\n' +
                'Good luck <@'+member.id+'>, I am counting on you.\n\n' +
                'O so you know, I gave you the IP: '+randomIP).catch(console.error);

        })
        .catch(console.error);


    console.log('[WumpusOS] new system has booted! I have given the system the IP: ' + randomIP);
};