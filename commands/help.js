const commands = require("../commands")
const { CHANNEL } = require("../consts")

const tmi = require("tmi.js")
const net = require("net")

module.exports = {
    helpMsg: "Displays help menu",
    usage: "",
    argRange: {
        min: 0,
        max: 0
    },

    /**
     * 
     * @param {tmi.Client} client 
     * @param {net.Socket} sockClient 
     * @param {String[]} args 
     */
    callback: (client, _sockClient, _args) => {
        for(const command in commands.commands) {
            client.say(CHANNEL, `${command}: ${commands.commands[command].helpMsg} (Usage: !${command} ${commands.commands[command].usage})`)
        }
    }
}