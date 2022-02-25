const { PLAYER_USERNAME } = require("../consts")
const cmd = require("./cmd")

module.exports = {
    helpMsg: `Executes a Minecraft command from my perspective (Equivalent to /execute as ${PLAYER_USERNAME} at ${PLAYER_USERNAME} run {command})`,
    usage: "{command}",
    argRange: {
        min: 1,
        max: Infinity
    },
    callback: (client, sockClient, args) => {
        cmd.callback(client, sockClient, `execute as ${PLAYER_USERNAME} at ${PLAYER_USERNAME} run ${args.join(" ")}`.split(/\s+/))
    }
}