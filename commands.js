const { CHANNEL, ENCODING } = require("./consts")

const fs = require("fs/promises")
const path = require("path")

const COMMAND_ID_SIZE = 1
const DATA_LENGTH_SIZE = 4

const COMMAND_DIR = "commands"

module.exports = {
    encodeCommand: (commandID, message) => {
        const encodedMsgBytes = new Uint8Array(Buffer.from(message, ENCODING))
        
        const dataLength = encodedMsgBytes.length + COMMAND_ID_SIZE + DATA_LENGTH_SIZE
        const headerBytes = []

        for(let i = 0; i < COMMAND_ID_SIZE; i++) {
            headerBytes.push((commandID & (0xff << (8 * i))) >> (8 * i))
        }

        for(let i = 0; i < DATA_LENGTH_SIZE; i++) {
            headerBytes.push((dataLength & (0xff << (8 * i))) >> (8 * i))
        }

        const headerBytesArr = new Uint8Array(headerBytes)

        const totalBytes = new Uint8Array(headerBytesArr.length + encodedMsgBytes.length)

        totalBytes.set(headerBytesArr, 0)
        totalBytes.set(encodedMsgBytes, headerBytesArr.length)

        return totalBytes
    },

    sendCommandWithResponse: (cmd, client, sockClient, args) => {
        const command = args.join(" ")
        const commandBytes = module.exports.encodeCommand(cmd, command)

        sockClient.write(commandBytes)

        sockClient.once("data", data => client.say(CHANNEL, `Server Response: ${data.toString(ENCODING)}`))
    },

    commands: {},

    initCommands: async () => {
        const dir = await fs.opendir(COMMAND_DIR)

        for await (const dirent of dir) {
            if(path.extname(dirent.name) !== ".js") continue

            const command = require(`./${COMMAND_DIR}/${dirent.name}`)
            const commandName = path.parse(dirent.name).name

            module.exports.commands[commandName] = command
        }
    }
}