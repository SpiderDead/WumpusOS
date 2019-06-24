module.exports = { "generateIP" : () => {
    let randomIP = "";

    for (let i = 0; i < 4; i++) {
        randomIP += Math.floor(Math.random() * (+255 - +1)) + +1;
        if (i !== 3) randomIP += ".";
    }

    return randomIP;
}};