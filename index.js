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
                [
                    { text: 'DeepLift'},
                    { text: 'Description', callback_data: 'btn1' },
                    { text: 'Play', web_app: { url: `https://d-a-n-l.github.io/testTgGEt/?username=${username}` } }
                ],
                [
                    { text: 'Кнопка 1', callback_data: 'btn1' },
                    { text: 'Кнопка 2', callback_data: 'btn2' }
                ]
            ]
        }
    };

    bot.sendMessage(msg.chat.id, 'Выберите кнопку:', keyboard);
});


module.exports = app;