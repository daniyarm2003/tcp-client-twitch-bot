const commands = require("../commands")
const { PLAYER_USERNAME } = require("../consts")

module.exports = {
    helpMsg: "Drops and scatters my inventory items around me",
    usage: "",
    argRange: {
        min: 0,
        max: 0
    },
    
    callback: (client, sockClient, _args) => {
        commands.sendCommandWithResponse(2, client, sockClient, [PLAYER_USERNAME])
    }
}