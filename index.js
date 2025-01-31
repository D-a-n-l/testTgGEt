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
    const user = msg.from;
    const userData = encodeURIComponent(JSON.stringify(user));

    bot.sendMessage(msg.chat.id, "Открыть игру:", {
        reply_markup: {
            inline_keyboard: [
                [{ 
                    text: "Я устал уже", 
                    web_app: { url: `https://d-a-n-l.github.io/testTgGEt/?user=${userData}` } 
                }]
            ]
        }
    });
});


module.exports = app;