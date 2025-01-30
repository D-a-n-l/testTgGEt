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

/*bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Открыть игру:", {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Играть!", web_app: { url: "https://d-a-n-l.github.io/testTgGEt/" } }]
            ]
        }
    });
});*/

const gameName = "DeepLift";
const queries = {};
bot.onText(/help/, (msg) => bot.sendMessage(msg.from.id, "Say /game if you want to play."));
bot.onText(/start|game/, (msg) => bot.sendGame(msg.from.id, gameName));
bot.on("callback_query", function (query) {
    if (query.game_short_name !== gameName) {
        bot.answerCallbackQuery(query.id, "Sorry, '" + query.game_short_name + "' is not available.");
    } else {
        queries[query.id] = query;
        let gameurl = "https://d-a-n-l.github.io/testTgGEt/";
        bot.answerCallbackQuery({
            callback_query_id: query.id,
            url: gameurl
        });
    }
});
bot.on("inline_query", function (iq) {
    bot.answerInlineQuery(iq.id, [{
        type: "game",
        id: "0",
        game_short_name: gameName
    }]);
});

module.exports = app;