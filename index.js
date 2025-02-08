const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
app.use(express.json());

const TOKEN = "AAF9bPKkb3Uqkd_X6ZoxmDMtqCWAvBs4U_E";
const bot = new TelegramBot(TOKEN);

let users = {}; // Словарь для хранения { username: user_id }

app.post("/", (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

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

// API для получения user_id по username
app.get("/get_user", (req, res) => {
    const username = req.query.username?.toLowerCase();
    if (username && users[username]) {
        res.json({ username: username, user_id: users[username] });
    } else {
        res.json({ error: "User not found" });
    }
});


module.exports = app;
