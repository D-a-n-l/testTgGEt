const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
app.use(express.json());

const TOKEN = "6436341565:AAF9bPKkb3Uqkd_X6ZoxmDMtqCWAvBs4U_E";
const bot = new TelegramBot(TOKEN);

app.post("/", (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

bot.onText(/\/start/, (msg) => {
    const userId = msg.from.id;
    const firstName = encodeURIComponent(msg.from.first_name);
    const url = `https://d-a-n-l.github.io/testTgGEt/?userId=${userId}&name=${firstName}`;

    bot.sendMessage(msg.chat.id, `Открыть игру: [Играть!](${url})`, { parse_mode: "Markdown" });
});


module.exports = app;