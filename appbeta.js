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
let interwal
let time
let day
let ePlan


client.on("ready", () => {
  defChannel = client.channels.cache.find((channel) => channel.id === config.tchId)

  console.log(Msg.startMsg)
  defChannel.send(Msg.startMsg)

  client.user.setPresence({
    activity: { name: config.prefix + "help" },
    status: "idle",
  });


});

function startInterval() {
  for (let isTrue = false; isTrue == false;) {
    const sec = new Date().getSeconds()
    if (sec == 0) {
      isTrue = true
      interwal = setInterval(interval.timeR, 60000)
    }
  }
}

startInterval()

client.on("message", async (msg) => {

  const { author, guild, channel, client } = msg

  if (msg.content.startsWith("sudo") && author.id == "315586609179262977") {
    channel.send(
      "https://cdn.discordapp.com/attachments/824760374557540413/831113720141840445/106px-Linux-commie.png"
    );
  }

  if (author.bot || !guild) return;
  if (!msg.content.startsWith(config.prefix)) return;

  day = new Date().getDay();
  day--;

  const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd == "help" || cmd == "") {
    msg.reply(Msg.eHelp)
  }

  else if (cmd == "ping") {
    msg.reply(Msg.Ping)
  }

  else if (cmd == "add") {
    msg.member.roles.add(config.roleId)
    msg.reply(Msg.Add)
  }

  else if (cmd == "remove") {
    msg.member.roles.remove(config.roleId)
    msg.reply(Msg.Remove)
  }

  else if (cmd === "info") {
    channel.send(Msg.Info)
  }

  else if (cmd === "plan") {
    if (args.length === 0) {
      console.log(day)
      if (day == 5 || day == -1) {
        channel.send(Msg.Weekend)
      }

      else {
        channel.send(planMsg.dPlan(day))
      }

    } else if (args[0] === "next" && day <= 4) {
      channel.send(planMsg.dPlan(day + 1))
    } else if (args[0] === "all") {
      channel.send(planMsg.fPlan())
    } else if (args[0] === "poniedziałek" || args[0] === "pon" || args[0] === "0") {
      channel.send(planMsg.dPlan(0))
    } else if (args[0] === "wtorek" || args[0] === "wt" || args[0] === "1") {
      channel.send(planMsg.dPlan(1))
    } else if (args[0] === "środa" || args[0] === "śr" || args[0] === "2") {
      channel.send(planMsg.dPlan(2))
    } else if (args[0] === "czwartek" || args[0] === "czw" || args[0] === "3") {
      channel.send(planMsg.dPlan(3))
    } else if (args[0] === "piątek" || args[0] === "pt" || args[0] === "4") {
      channel.send(planMsg.dPlan(4))
    } else if (args[0] > 4) {
      channel.send(Msg.outDay)
    }

  }

  else if (cmd === "setup") {
    setup(msg)
    clearInterval(interwal)
    startInterval()
  }
});

client.login(config.token);

function setup(m) {
  let voiceChannelData;
  let roleData;
  let setupMessage = ""

  if (!m.guild.channels.cache.some((channel) => channel.id == config.vchId)) {
    voiceChannelData = guild.channels.create("inProgress", {
      type: "voice",
    });
    config.vchId = voiceChannelData.id;
    setupMessage = setupMessage + Msg.Setup.vch + "\n"
  }


  if (!m.guild.roles.cache.some((role) => role.id == config.roleId)) {
    roleData = guild.roles.create({
      data: {
        name: "pbping",
        color: config.color,
      },
      reason: "PlanBot need this role to ping people",
    });
    config.roleId = roleData.id;
    setupMessage = setupMessage + Msg.Setup.role + "\n"
  }

  if (m.channel.id != config.tchId) {
    config.tchId = m.channel.id;
    setupMessage = setupMessage + Msg.Setup.tch + "\n"
  }
  const dataToWrite = JSON.stringify(config, null, 4);
  if (Config != dataToWrite) {
    fs.writeFile("config.json", dataToWrite, (err) => {
      if (err) {
        throw err;
      }
    });
    Config = dataToWrite
    setupMessage = setupMessage + Msg.Setup.json + "\n"
    defChannel = client.channels.cache.find((channel) => channel.id === config.tchId)
  }
  
  if (setupMessage != "") {
    defChannel.send(setupMessage)
  }
  else {
    defChannel.send(Msg.Setup.Nofing)
  }

}

//client.login('ODI3MTg2OTAxNzE4MjY5OTgy.YGXX1Q.ppZ0-U5NUF6_IJwX1377W7JspWs');