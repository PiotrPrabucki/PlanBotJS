const Discord = require("discord.js")
const fs = require("fs");
const { MessageEmbed } = require('discord.js');

const Config = fs.readFileSync("config.json", "utf8");
const config = JSON.parse(Config);

const data = fs.readFileSync(config.planFile, "utf8");
const Data = JSON.parse(data);

const eHelp = new MessageEmbed().setColor(config.color).setTitle('help').addFields(
    {
        name: config.prefix + "help",
        value: " - wyświetla liste komend",
        inline: false,
    },
    {
        name: config.prefix + "info",
        value: "- wypisuje podstawowe informacje o bocie",
        inline: false,
    },
    {
        name: config.prefix + "setup",
        value:
            " - przygotowywuje serwer do pracy. Ta komenda jest wymagana do poprawnego działania bota ",
        inline: false,
    },
    {
        name: config.prefix + "add",
        value: " - nadaje role pbping która jest 5 min przed lekcją pingowana ",
        inline: false,
    },
    {
        name: config.prefix + "remove",
        value: " - zabiera role pbping która jest 5 min przed lekcją pingowana ",
        inline: false,
    },
    {
        name: config.prefix + "plan",
        value: " - wypisuje plan lekcji na obecny dzień",
        inline: false,
    },
    {
        name: config.prefix + "plan next",
        value: " - wypisuje plan lekcji na następny dzień",
        inline: false,
    },
    {
        name: config.prefix + "plan poniedziałek/pon/0",
        value: " - wypisuje plan lekcji na dany dzień",
        inline: false,
    },
    {
        name: config.prefix + "plan all",
        value: " - wypisuje plan lekcji na cały tydzień",
        inline: false,
    }
)



module.exports = {
    eHelp,
    startMsg: "Dzień dobry wszystkim",
    Ping: "zamknij morde działam przecież",
    Info: "Autorzy bota: **Piotr Prabucki** i **Jakub Seemann**",
    Add: "Rola została nadana",
    Remove: "Rola została usunięta",
    outDay: "W kododawaniu liczymy od zera",
    Weekend: "Weekend",
    Setup:
    {
        json: "JSON nadpisany",
        role: "Stworzono role",
        tch: "Zapisano kanał jako domyślny",
        vch: "Stworzono kanał głosowy",
        Nofing: "Nic nie zostało zmienione"
    }
}