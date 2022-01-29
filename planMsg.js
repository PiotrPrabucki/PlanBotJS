const Discord = require("discord.js")
const fs = require("fs");

const Config = fs.readFileSync("config.json", "utf8");
const config = JSON.parse(Config);

const data = fs.readFileSync(config.planFile, "utf8");
const Data = JSON.parse(data);
