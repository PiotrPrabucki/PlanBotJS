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
let lessTitle = "inProgress"
let a = true


console.log(Data.Plan.Day[0].Lesson[1].Hour)

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

    clearInterval(interval)
    startInterval(msg)

  }else if(cmd === 'stop'){

    clearInterval(interval)

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
      type: 'GUILD_VOICE',
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


let actlesson;
  
function Interwwal(){
 
  let min = new Date().getMinutes()
  let hour = new Date().getHours()
  let dAy = new Date().getDay() - 1
/*
min++
if(min === 60){
  min = 0
  hour++
}
if(hour === 17){
  clearInterval(interval)
}
*/
  //console.log(dAy);
 // console.log(Data.Plan.Day[dAy].Lesson[0].Name)
  //console.log(min+''+hour)
  if(dAy === -1 || dAy === 6){
    lessTitle = 'Weekend'
    if (client.channels.cache.get(config.vchId).name != lessTitle) {
    
      client.channels.cache.get(config.vchId).setName(lessTitle)
     }
     console.log(hour+ ':'+min+' '+lessTitle)
     return 0
  }
  if(hour < 8){
    lessTitle = Data.Plan.Day[dAy].Lesson[0].Name + " "+ Data.Plan.Day[dAy].Lesson[0].Hour + ':' + Data.Plan.Day[dAy].Lesson[0].Min + '0'
    actlesson = 0
    //console.log(hour+ ':'+min+' '+lessTitle)
  }else{
     for(let i = 0;i < 9; i++){
    
        if(Data.Plan.Day[dAy].Lesson[i].Hour == hour && Data.Plan.Day[dAy].Lesson[i].Min == min && Data.Plan.Day[dAy].Lesson[i].Name != null){
            lessTitle = Data.Plan.Day[dAy].Lesson[i].Name + " trwa!"
            actlesson = i
            //console.log(hour+ ':'+min+' '+lessTitle)
            i=10
        }else if(Data.Plan.Day[dAy].Lesson[i].Name === null){
          lessTitle = 'Koniec lekcji'
          //console.log(hour+ ':'+min+' '+lessTitle)
        }
        
    }
    if(actlesson<8){
      if(Data.Plan.Day[dAy].Lesson[actlesson].Hour == hour && Data.Plan.Day[dAy].Lesson[actlesson].Min + 4 == min){
         lessTitle = Data.Plan.Day[dAy].Lesson[actlesson + 1].Name + " "+ Data.Plan.Day[dAy].Lesson[actlesson + 1].Hour + ':' + Data.Plan.Day[dAy].Lesson[actlesson + 1].Min
        // console.log(hour+ ':'+min+' '+lessTitle)
      }

    }if(dAy === 4 && actlesson === 7){
      if(Data.Plan.Day[dAy].Lesson[actlesson].Hour == hour && Data.Plan.Day[dAy].Lesson[actlesson].Min + 4 == min){
         lessTitle = 'Koniec lekcji'
         //console.log(hour+ ':'+min+' '+lessTitle)
      }

    }else if(actlesson === 8){
      if(Data.Plan.Day[dAy].Lesson[actlesson].Hour == hour && Data.Plan.Day[dAy].Lesson[actlesson].Min + 4 == min){
        lessTitle = 'Koniec lekcji'
        //console.log(hour+ ':'+min+' '+lessTitle)
     }
    }
    
  if (client.channels.cache.get(config.vchId).name != lessTitle) {
    
   client.channels.cache.get(config.vchId).setName(lessTitle)
  }
  // return 0
}
if (client.channels.cache.get(config.vchId).name != lessTitle) {
    
  client.channels.cache.get(config.vchId).setName(lessTitle)
 }
console.log(hour+ ':'+min+' '+lessTitle)
}
async function startInterval(msg) {
  await msg.reply('Uruchamianie interwału...');
  console.log('AHA');
  
  while(a) {
    const sec = new Date().getSeconds()
    
    if (sec == 0) {
      msg.reply('Uruchomiono interwał');
      msg.reply('Oczekiwanie na lekcje...');
      interval = setInterval(Interwwal, 500)
      a = false 
      console.log(a);
    }
  }
}

client.login(config.token);