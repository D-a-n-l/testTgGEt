const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
app.use(express.json());

const TOKEN = "AAF9bPKkb3Uqkd_X6ZoxmDMtqCWAvBs4U_E";
const bot = new TelegramBot(TOKEN);

let users = {}; // Словарь для хранения { username: user_id }

// Обрабатываем /start и сохраняем user_id
bot.onText(/\/start/, (msg) => {
    const user_id = msg.from.id;
    const username = msg.from.username;

    if (username) {
        users[username.toLowerCase()] = user_id;
        console.log(`Сохранен: @${username} -> ${user_id}`);
    }

    bot.sendMessage(user_id, "Открыть игру:", {
        reply_markup: {
            inline_keyboard: [
                [{ text: username, web_app: { url: "https://d-a-n-l.github.io/testTgGEt/" } }]
            ]
        }
    });
});


module.exports = app;
