const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
app.use(express.json());

const TOKEN = "6436341565:AAF9bPKkb3Uqkd_X6ZoxmDMtqCWAvBs4U_E";

const bot = new TelegramBot(TOKEN, { webHook: true });

const URL = 'https://test-tg-g-et.vercel.app/';
bot.setWebHook(`${URL}/api/bot${TOKEN}`);

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        res.status(200).end(); // Отвечаем сразу, чтобы избежать задержки
        bot.processUpdate(req.body);
    } else {
        res.status(200).send('Hello from Telegram Bot');
    }
};


bot.onText(/\/start/, (msg) => {
    const username = msg.from.username || "";
    
    const keyboard = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Play', web_app: { url: `https://d-a-n-l.github.io/testTgGEt/?username=${username}` } }]
            ]
        }
    };

    bot.sendMessage(msg.chat.id, 'Выберите кнопку:', keyboard);
});