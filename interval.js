const planMsg = require("./planMsg.js")
const Msg = require("./msg.js")
const interval = require("./interval.js")
const Discord = require("discord.js")
const fs = require("fs")
let Config = fs.readFileSync("config.json", "utf8")
let config = JSON.parse(Config)
const data = fs.readFileSync(config.planFile, "utf8")
const Data = JSON.parse(data)
let lessTitle = "Error, Bierz telefon i dzwoń do Jsona"

function timeR() {
    const miN = new Date().getMinutes()
    const houR = new Date().getHours()
    const daY = new Date().getDay()
    const hourMin =
    {
        Min: miN,
        Hour: houR
    }
    if (daY != -1 || daY != 6) {

        const actMin = toMin(hourMin)
        const fl = firstLess()
        const ll = lastLess()
        if (toMin(Data.Plan.Day[daY].Lesson[fl]) - 10 > actMin) {
            lessTitle = "Pierwsza lekcja: " + Data.Plan.Day[daY].Lesson[fl] + " o: " + Data.Plan.Day[daY].Lesson[fl].Hour + ":" + Data.Plan.Day[daY].Lesson[fl].Min
        } else if (toMin(Data.Plan.Day[daY].Lesson[ll]) < actMin) {
            lessTitle = "Koniec lekcji na dziś"
        } else {
            const al = actLess(daY, actMin)
            if (toMin(Data.Plan.Day[daY].Lesson[al]) <= actMin && toMin(Data.Plan.Day[daY].Lesson[al]) + 20 >= actMin) {
                lessTitle = "Teraz: " + Data.Plan.Day[daY].Lesson[al].Name
                const name = Data.Plan.Day[day].Lesson[al].Name
                if (name !== "Ckz" || toMin(Data.Plan.Day[daY].Lesson[al]) <= actMin) {
                    const chPing = client.channels.cache.find((channel) => channel.id === config.tchId)
                    chPing.send("<@&" + config.roleId + ">" + " " + title)
                }
            } else {
                lessTitle = "Następna lekcja: " + Data.Plan.Day[daY].Lesson[al].Name + " o: " + Data.Plan.Day[daY].Lesson[fl].Hour + ":" + Data.Plan.Day[daY].Lesson[fl].Min
            }
        }
    } else {
        lessTitle = Msg.Weekend
    }

    if (client.channels.cache.get(config.vchId).name != lessTitle) {
        guild.channels.cache.get(config.vchId).setName(lessTitle)
    }
}


function actLess(dAy, time) {

    for (let i = 0; i < 10; i++) {

        if (toMin(Data.Plan.Day[dAy].Lesson[i]) < time && toMin(Data.Plan.Day[dAy].Lesson[i]) + 45 > time) {
            return i
        }
    }

}

function firstLess(dAy) {

    let i = 0
    let isFalse = true

    for (; isFalse; i++) {
        if (Data.Plan.Day[dAy].Lesson[i].Name != 'null') {
            isFalse = false
            return i
        }
    }
}

function lastLess(dAy) {

    let i = 9
    let isFalse = true

    for (; isFalse; i--) {
        if (Data.Plan.Day[dAy].Lesson[i].Name != 'null') {
            isFalse = false
            return i
        }
    }
}

function toMin(a) {
    const c = a.Hour * 60 + a.Min
    return c
}

module.exports = {
    timeR
}