const player = require("./player")

module.exports = {
    helpMsg: "Summons an entity on me",
    usage: "{entity name}",
    argRange: {
        min: 1,
        max: 1
    },
    
    callback: (client, sockClient, args) => {
        player.callback(client, sockClient, `summon ${args.join(" ")} ~ ~ ~`.split(/\s+/))
    }
}