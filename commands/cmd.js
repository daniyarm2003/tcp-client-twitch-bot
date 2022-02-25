const commands = require("../commands")

/**
 * @deprecated Command validation is now server side
 */
const BANNED_COMMANDS = [
    "kill",
    "gamemode",
    "clear",
    "gamerule"
]

/**
 * @deprecated Command validation is now server side
 */
const validateCommand = (command) => {
    for(const bannedCmd of BANNED_COMMANDS) {
        if(command == bannedCmd)
            return `${command} is a banned command.`
    }
}

/**
 * @deprecated Command validation is now server side
 */
const BANNED_EFFECTS = [
    "wither",
    "instant_damage",
    "regeneration",
    "saturation"
]

/**
 * @deprecated Command validation is now server side
 */
const MAX_EFFECT_AMPLIFIER = 4

/**
 * @deprecated Command validation is now server side
 */
const MIN_Y_TP = -30

/**
 * @deprecated Command validation is now server side
 */
const COMMAND_LIMITS = {
    effect(args) {
        args = args.slice(0, 5)

        if(args[0] == "clear") return

        else if(args.length < 3) 
            return "Your syntax for the effect command is probably malformed. There should be at least 3 arguments."

        else if(args.length == 5) {
            const amplifier = parseInt(args[4])

            if(amplifier && amplifier > MAX_EFFECT_AMPLIFIER) 
                return `Effect amplifiers are capped at ${MAX_EFFECT_AMPLIFIER}.`
        }

        const effect = args[2]
        for(const bannedEffect of BANNED_EFFECTS) {
            if(effect == bannedEffect || effect == `minecraft:${bannedEffect}`)
                return `${bannedEffect.replace('_', ' ')} is a banned effect.`
        }
    },
    execute(args) {
        const cmdInd = args.indexOf("run")

        if(cmdInd != -1 && cmdInd + 1 != args.length)
            return this[args[cmdInd + 1]] ? this[args[cmdInd + 1]](args.slice(cmdInd + 2)) : validateCommand(args[cmdInd + 1])
    },
    teleport(args) {
        if(args.length < 3) return

        const yArg = args.length == 3 ? 1 : 2
        const y = parseFloat(args[yArg])

        if(y && y < MIN_Y_TP) return `Cannot teleport under y=${MIN_Y_TP}`

        for(const arg of args) {
            if(arg.includes('~') || arg.includes('^'))
                return "Cannot use relative coords due to exploitability (temporary fix)"
        }
    },
    tp(args) {
        return this.teleport(args)
    }
}

module.exports = {
    helpMsg: "Executes a Minecraft command from the server's perspective",
    usage: "{command}",
    argRange: {
        min: 1,
        max: Infinity
    },
    
    callback: (client, sockClient, args) => {
        commands.sendCommandWithResponse(0, client, sockClient, args)
    }
}