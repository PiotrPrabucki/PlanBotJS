const planMsg = require("./planMsg.js")
const Msg = require("./msg.js")
const interval = require("./interval.js")
const Discord = require("discord.js")
const fs = require("fs")
let Config = fs.readFileSync("config.json", "utf8")
let config = JSON.parse(Config)
const data = fs.readFileSync(config.planFile, "utf8")
const Data = JSON.parse(data)
const { MessageEmbed } = require('discord.js');


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
  }else if(cmd === 'plan'){
    let date = new Date()
    day = date.getDay()
    planMsg.dPlan(day);
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
  }
}

client.login(config.token);