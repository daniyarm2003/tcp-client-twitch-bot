const player = require("./player")

module.exports = {
    helpMsg: "Applies a potion effect on me (only works if stronger potion effect is not present)",
    usage: "{potion effect} {effect time in seconds (2 minutes if unspecified)} {effect strength (0-255)}",
    argRange: {
        min: 2,
        max: 3
    },
    
    callback: (client, sockClient, args) => {
        player.callback(client, sockClient, `effect give @s ${args[0]} ${args[2] ? args[1] : 120} ${args[2] || args[1]}`.split(/\s+/))
    }
}