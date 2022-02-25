const commands = require("../commands")
const { PLAYER_USERNAME } = require("../consts")

module.exports = {
    helpMsg: `Sets me on fire for ${0x7fffffff / 20.0} seconds`,
    usage: "",
    argRange: {
        min: 0,
        max: 0
    },
    
    callback: (client, sockClient, _args) => {
        commands.sendCommandWithResponse(7, client, sockClient, [PLAYER_USERNAME])
    }
}