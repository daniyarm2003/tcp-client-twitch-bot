const commands = require("../commands")
const { PLAYER_USERNAME } = require("../consts")

module.exports = {
    helpMsg: "Modifies my velocity (x and z are relative to the direction I am facing, y is always up)",
    usage: "{x} {y} {z}",
    argRange: {
        min: 3,
        max: 3
    },
    
    callback: (client, sockClient, args) => {
        for(const arg of args) {
            if(isNaN(parseFloat(arg))) {
                client.say(`Invalid argument "${arg}" (Must be a number)`)
                    .catch(console.error)
                
                return
            }
        }

        commands.sendCommandWithResponse(3, client, sockClient, [PLAYER_USERNAME].concat(args))
    }
}