const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const fs = require('fs');



//Call listeners
fs.readdir('./listeners/', (err, files) => {
    if (err) return console.log(err);
    files.forEach(file => {
        let eventFunction = require(`./listeners/${file}`);
        let eventName = file.split('.')[0];
        console.log("[WumpusOS] Starting " + eventName + "... ");
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});

client.on('error', console.error);

client.login(config.token).catch(console.error);