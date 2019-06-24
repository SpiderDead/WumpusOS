exports.run = (client, member) => {
    const randomIP = require('../utils/IP.js').generateIP();
    const randomIPdashed = randomIP.replace(/[.]/g, '_');
    let channelid = '';


    member.setNickname(randomIP).catch(console.error);
    member.guild.createChannel(randomIPdashed, { type: 'text'})
        .then(c => {
            c.setParent('592793688971935755').catch(console.error);
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