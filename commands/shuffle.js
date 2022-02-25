const commands = require("../commands")
const { PLAYER_USERNAME } = require("../consts")

module.exports = {
    helpMsg: "Shuffles my inventory items",
    usage: "",
    argRange: {
        min: 0,
        max: 0
    },
    
    callback: (client, sockClient, _args) => {
        commands.sendCommandWithResponse(4, client, sockClient, [PLAYER_USERNAME])
    }
}