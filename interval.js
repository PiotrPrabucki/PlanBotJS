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

