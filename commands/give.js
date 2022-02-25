const player = require("./player")

module.exports = {
    helpMsg: "Gives me an item",
    usage: "{item name} {amount (1 if unspecified)}",
    argRange: {
        min: 1,
        max: 2
    },
    
    callback: (client, sockClient, args) => {
        player.callback(client, sockClient, `give @s ${args[0]} ${args[1] || 1}`.split(/\s+/))
    }
}