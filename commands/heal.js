const commands = require("../commands")
const { PLAYER_USERNAME } = require("../consts")

module.exports = {
    helpMsg: "Heals me to full hp (no one will ever use this lmao)",
    usage: "",
    argRange: {
        min: 0,
        max: 0
    },
    
    callback: (client, sockClient, _args) => {
        commands.sendCommandWithResponse(6, client, sockClient, [PLAYER_USERNAME])
    }
}