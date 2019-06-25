exports.run = (client, message) => {
    message.channel.send("Good job! You have succesfully asked me for help. Here are some commands you can run:\n\n" +
        "ping {IP} - Ping a node and check if it is online!\n" +
        "connect {IP} - Connect to a node and control the enviroment. **Warning: firewall could be active!**\n" +
        "disconnect {IP} - Disconnect from a node. (Please don't try to disconnect from your own node...)\n" +
        "status - Get the status of the current node you are on.").catch(console.error);
};