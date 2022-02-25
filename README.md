# tcp-client-twitch-bot

This is a node.js application that uses Twitch’s tmi.js npm package to create a Twitch bot, to allow Twitch users to interact with a Minecraft world, by converting commands to TCP messages.

- Twitch users can send commands and messages in the chat
- The chat messages are processed by the bot, and are marshalled into TCP messages
- A Minecraft mod unmarshalls the messages, and performs the action specified by the Twitch user
