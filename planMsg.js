const Discord = require("discord.js")
const fs = require("fs");

const Config = fs.readFileSync("config.json", "utf8");
const config = JSON.parse(Config);

const data = fs.readFileSync(config.planFile, "utf8");
const Data = JSON.parse(data);
const { MessageEmbed } = require('discord.js');
function fPlan() {
    fullPlan = new MessageEmbed()
        .setColor(config.color)
        .setTitle("Plan Lekcji")
        .addFields(
            {
                name: "Nr.lekcji",
                value: "0.\n1.\n2.\n3.\n4.\n5.\n6.\n7.\n8.\n9.",
                inline: true,
            },
            {
                name: "Poniedziałek",
                value:
                    Data.Plan.Day[0].Lesson[0].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[0].Lesson[1].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[0].Lesson[2].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[0].Lesson[3].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[0].Lesson[4].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[0].Lesson[5].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[0].Lesson[6].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[0].Lesson[7].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[0].Lesson[8].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[0].Lesson[9].Name.replace("null", "Wolna lekcja"),
                inline: true,
            },
            {
                name: "Wtorek",
                value:
                    Data.Plan.Day[1].Lesson[0].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[1].Lesson[1].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[1].Lesson[2].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[1].Lesson[3].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[1].Lesson[4].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[1].Lesson[5].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[1].Lesson[6].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[1].Lesson[7].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[1].Lesson[8].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[1].Lesson[9].Name.replace("null", "Wolna lekcja"),
                inline: true,
            },
            {
                name: "środa",
                value:
                    Data.Plan.Day[2].Lesson[0].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[2].Lesson[1].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[2].Lesson[2].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[2].Lesson[3].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[2].Lesson[4].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[2].Lesson[5].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[2].Lesson[6].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[2].Lesson[7].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[2].Lesson[8].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[2].Lesson[9].Name.replace("null", "Wolna lekcja"),
                inline: true,
            },
            {
                name: "Czwartek",
                value:
                    Data.Plan.Day[3].Lesson[0].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[3].Lesson[1].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[3].Lesson[2].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[3].Lesson[3].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[3].Lesson[4].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[3].Lesson[5].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[3].Lesson[6].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[3].Lesson[7].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[3].Lesson[8].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[3].Lesson[9].Name.replace("null", "Wolna lekcja"),
                inline: true,
            },
            {
                name: "Piątek",
                value:
                    Data.Plan.Day[4].Lesson[0].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[4].Lesson[1].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[4].Lesson[2].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[4].Lesson[3].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[4].Lesson[4].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[4].Lesson[5].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[4].Lesson[6].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[4].Lesson[7].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[4].Lesson[8].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[4].Lesson[9].Name.replace("null", "Wolna lekcja"),
                inline: true,
            }
        );
    return fullPlan
}
/*
function dPlan(dayIn) {
    dayPlan = new MessageEmbed()
        .setColor(config.color)
        .setTitle("Plan Lekcji")
        .addFields(
            {
                name: "Nr.lekcji",
                value: "0.\n1.\n2.\n3.\n4.\n5.\n6.\n7.\n8.\n9.",
                inline: true,
            },
            {
                name: "Lekcja",
                value:
                    Data.Plan.Day[dayIn].Lesson[0].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[dayIn].Lesson[1].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[dayIn].Lesson[2].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[dayIn].Lesson[3].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[dayIn].Lesson[4].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[dayIn].Lesson[5].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[dayIn].Lesson[6].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[dayIn].Lesson[7].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[dayIn].Lesson[8].Name.replace("null", "Wolna lekcja") + "\n" +
                    Data.Plan.Day[dayIn].Lesson[9].Name.replace("null", "Wolna lekcja"),
                inline: true,
            }
        );
    return dayPlan
}
*/
module.exports = { 
    //dPlan, 
    fPlan 
}