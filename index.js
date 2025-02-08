const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
app.use(express.json());

const TOKEN = "";
const bot = new TelegramBot(TOKEN);

app.post("/", (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

bot.onText(/\/start/, (msg) => {
    const username = msg.from.username || "";

    bot.sendMessage(msg.chat.id, "Открыть игру:", {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Играть", web_app: { url: `https://d-a-n-l.github.io/testTgGEt/?username=${username}` } }]
            ]
        }
    });
});


module.exports = app;