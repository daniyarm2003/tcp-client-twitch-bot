const commands = require("../commands")
const { PLAYER_USERNAME } = require("../consts")

module.exports = {
    helpMsg: "Makes neutral and hostile mobs within a 100 block radius target me",
    usage: "",
    argRange: {
        min: 0,
        max: 0
    },
    
    callback: (client, sockClient, _args) => {
        commands.sendCommandWithResponse(5, client, sockClient, [PLAYER_USERNAME])
    }
}