const tmi = require("tmi.js")
const net = require("net")
const { exit } = require("process")

const { CHANNEL, OAUTH_TOKEN, ENCODING, PORT } = require("./consts")
const commands = require("./commands")

commands.initCommands()
    .catch(console.error)

const opts = {
    identity: {
        username: CHANNEL,
        password: OAUTH_TOKEN
    },
    channels: [
        CHANNEL
    ]
}

const client = tmi.client(opts)
const sockClient = new net.Socket()

sockClient.connect(PORT, '127.0.0.1', () => console.log("Connection to Minecraft world has been established!"))

sockClient.on('error', err => {
    console.log(err)
    client.disconnect()

    exit(1)
})

client.on('message', (channel, userState, message, isSelf) => {
    if(isSelf) return

    let args = message.split(/\s+/)
    if(args.length == 0) return

    const cmd = args[0]
    
    const prefixChar = cmd.charAt(0)
    const cmdName = cmd.slice(1)

    args = args.slice(1)

    if(prefixChar == '!') {
        const command = commands.commands[cmdName]

        if(command) {
            if(args.length < command.argRange.min || args.length > command.argRange.max) {
                client.say(channel, `The number of arguments must be in the range from ${command.argRange.min} to ${command.argRange.max} (Found ${args.length})`)
                return
            }

            command.callback(client, sockClient, args)

            return
        }

        client.say(channel, `!${cmdName} is not a command. Type !help to list commands.`)
    }
    else {
        const msgBytes = commands.encodeCommand(1, `${userState.username} (Twitch): ${message}`)

        sockClient.write(msgBytes)
        sockClient.once("data", data => console.log(data.toString(ENCODING)))
    }
})

client.on('connected', (address, port) => console.log(`Connected to ${address}:${port}`))

client.on('join', (channel, username, isSelf) => {
    if(isSelf) return

    client.say(channel, `Hello ${username}!`)
        .catch(console.error)
})

client.connect()