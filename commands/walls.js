const player = require("./player")

module.exports = {
    helpMsg: "Encases me in a 3x3x3 hollow cube made of a block of your choice",
    usage: "{block name}",
    argRange: {
        min: 1,
        max: 1
    },
    
    callback: (client, sockClient, args) => {
        player.callback(client, sockClient, `fill ~-3 ~-3 ~-3 ~3 ~3 ~3 ${args[0]} outline`.split(/\s+/))
    }
}