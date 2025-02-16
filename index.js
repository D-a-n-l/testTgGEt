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
    const username = msg.from.username || "";
    
    const keyboard = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Play', web_app: { url: `https://d-a-n-l.github.io/testTgGEt/?username=${username}` } }]
            ]
        }
    };

    bot.sendMessage(msg.chat.id, 'DeepLift', keyboard);
});


module.exports = app;