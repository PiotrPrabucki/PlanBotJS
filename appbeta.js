const planMsg = require("./planMsg.js")
const Msg = require("./msg.js")
const interval = require("./interval.js")
const Discord = require("discord.js")
const fs = require("fs")
let Config = fs.readFileSync("config.json", "utf8")
let config = JSON.parse(Config)
const data = fs.readFileSync(config.planFile, "utf8")
const Data = JSON.parse(data)

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
let defChannel
client.on("ready", () => {
  defChannel = client.channels.cache.find((channel) => channel.id === config.tchId)

  console.log(Msg.startMsg)
  defChannel.send(Msg.startMsg)

  client.user.setPresence({
    activity: { name: config.prefix + "help" },
    status: "idle",
  });


});
if (author.bot || !guild) return;
if (!msg.content.startsWith(config.prefix)) return;

client.login(config.token);