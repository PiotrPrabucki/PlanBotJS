const planMsg = require("./planMsg.js")
const Msg = require("./msg.js")
//const interval = require("./interval.js")
const Discord = require("discord.js")
const fs = require("fs")
let Config = fs.readFileSync("config.json", "utf8")
let config = JSON.parse(Config)
const data = fs.readFileSync(config.planFile, "utf8")
const Data = JSON.parse(data)
const { MessageEmbed } = require('discord.js');
let interval

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
let defChannel
client.on("ready", () => {
  defChannel = client.channels.cache.find((channel) => channel.id === config.tchId)

  console.log(Msg.startMsg)
  if(defChannel){
  defChannel.send(Msg.startMsg)
  }
  client.user.setPresence({
    activity: { name: config.prefix + "help" },
    status: "idle",
  });


});
client.on('messageCreate', async (msg) =>{

  const {guild, author, channel} = msg
  day = new Date().getDay();

  day--;

  if (!msg.content.startsWith(config.prefix)) return;
  if (author.bot || !guild) return;
  const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if(cmd === 'help' || cmd===''){
    msg.reply({ embeds: [Msg.eHelp] })
  }else if(cmd === 'info'){

    msg.reply(Msg.Info);

  }else if(cmd === 'setup'){

    setup(msg, false)

  }else if(cmd === 'devsetup'){

    setup(msg, true)

  }else if(cmd === 'start'){

    startInterval(msg)

  }else if(cmd === 'plan'){

    if (args.length === 0) {
      console.log(day)
      if (day == 5 || day == -1) {
        channel.send(Msg.Weekend)
      }

      else {
        channel.send({embeds: [planMsg.dPlan(day)]})
      }

    } else if (args[0] === "next" && day <= 3) {
      channel.send({embeds: [planMsg.dPlan(day + 1)]})
    }else if (args[0] === "next" && day === 4) {
      channel.send({embeds: [planMsg.dPlan(0)]})
    } else if (args[0] === "all") {
      channel.send({embeds: [planMsg.fPlan()]})
    } else if (args[0] === "poniedziałek" || args[0] === "pon" || args[0] === "0") {
      channel.send({embeds: [planMsg.dPlan(0)]})
    } else if (args[0] === "wtorek" || args[0] === "wt" || args[0] === "1") {
      channel.send({embeds: [planMsg.dPlan(1)]})
    } else if (args[0] === "środa" || args[0] === "śr" || args[0] === "2") {
      channel.send({embeds: [planMsg.dPlan(2)]})
    } else if (args[0] === "czwartek" || args[0] === "czw" || args[0] === "3") {
      channel.send({embeds: [planMsg.dPlan(3)]})
    } else if (args[0] === "piątek" || args[0] === "pt" || args[0] === "4") {
      channel.send({embeds: [planMsg.dPlan(4)]})
    } else if (args[0] > 4) {
      channel.send(Msg.outDay)
    }
  }

})
async function setup(msg, dev){
  config.tchId = msg.channel.id
  console.log(config.tchId);
  msg.channel.send('ustawiono kanał __***' + msg.channel.name + '***__ jako domyślny kanał tekstowy')
  if (!msg.guild.channels.cache.some((channel) => channel.id == config.vchId)) {
    voiceChannelData = await msg.guild.channels.create("inProgress", {
      type: "voice",
    });
    config.vchId = voiceChannelData.id;
    console.log(voiceChannelData.id)
    msg.channel.send("Utworzono kanał wyświetlający następną lekcje")
  }
  const dataToWrite = JSON.stringify(config, null, 4);
  if (Config != dataToWrite) {
    fs.writeFile("config.json", dataToWrite, (err) => {
      if (err) {
        throw err;
      }
    });
    Config = dataToWrite
    defChannel = client.channels.cache.find((channel) => channel.id === config.tchId)
    
  }
  if(dev === true){
    const dev = new MessageEmbed().setColor(config.color).setTitle('dev').setDescription(JSON.stringify(config))
  msg.channel.send({embeds: [dev]})
  const min = new Date().getMinutes()
  const hour = new Date().getHours()
  const day = new Date().getDay()
  msg.channel.send(day+' '+hour+' '+min)
  }
}

function startInterval(msg) {
  for (let isTrue = false; isTrue == false;) {
    const sec = new Date().getSeconds()
    if (sec == 0) {
      isTrue = true
      interval = startInterval(Interwwal(msg), 1000)
    }
  }
}

function Interwwal(msg){
  const min = new Date().getMinutes()
  const hour = new Date().getHours()
  const day = new Date().getDay()
  let lessTitle = "inProgress"
  console.log(min+''+hour)
  if (client.channels.cache.get(config.vchId).name != lessTitle) {
    client.channels.cache.get(config.vchId).setName(lessTitle)
}
}

client.login(config.token);