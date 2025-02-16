const TelegramBot = require("node-telegram-bot-api");

const TOKEN = "6436341565:AAF9bPKkb3Uqkd_X6ZoxmDMtqCWAvBs4U_E";
const bot = new TelegramBot(TOKEN, { webHook: true });

const axios = require('axios');

// URL твоего Webhook
const URL = 'https://bot-three-plum.vercel.app/api/bot' + TOKEN;

// Периодический пинг сервера (раз в 5 минут)
setInterval(() => {
    axios.get(URL).then(() => console.log('Ping успешен')).catch(err => console.log('Ping ошибка:', err.message));
}, 5 * 60 * 1000);

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        res.status(200).end(); // Отвечаем сразу, чтобы Telegram не повторял запрос
        process.nextTick(() => bot.processUpdate(req.body));
    } else {
        res.status(200).send('Hello from Telegram Bot');
    }
};

bot.onText(/\/start/, (msg) => {
    const keyboard = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'DeepLift', callback_data: 'DeepLift'}
                ],
                [
                    { text: 'StreetPigeon', callback_data: 'StreetPigeon'}
                ],
            ]
        }
    };

    bot.sendMessage(msg.chat.id, 'Выберите игру:', keyboard);
});

bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const username = query.from.username || "";

    if (query.data === 'DeepLift') {
        const newKeyboard = {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Description', callback_data: 'btn1' },
                        { text: 'Play', web_app: { url: `https://d-a-n-l.github.io/testTgGEt/?username=${username}` } }
                    ],
                    [
                        { text: 'Back', callback_data: 'Back' },
                    ]
                ]
            }
        };

        bot.editMessageText('Выберите действие:', {
            chat_id: chatId,
            message_id: query.message.message_id,
            reply_markup: newKeyboard.reply_markup
        });
    }

    if (query.data === 'StreetPigeon') {
        const newKeyboard = {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Description', callback_data: 'btn1' },
                        { text: 'Play', callback_data: 'btn2' }
                    ],
                    [
                        { text: 'Back', callback_data: 'Back' },
                    ]
                ]
            }
        };

        bot.editMessageText('Выберите действие:', {
            chat_id: chatId,
            message_id: query.message.message_id,
            reply_markup: newKeyboard.reply_markup
        });
    }

    if (query.data === 'Back') {
        const originalKeyboard = {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'DeepLift', callback_data: 'DeepLift'}
                    ],
                    [
                        { text: 'StreetPigeon', callback_data: 'StreetPigeon'}
                    ],
                ]
            }
        };

        bot.editMessageText('Нажмите кнопку ниже:', {
            chat_id: chatId,
            message_id: query.message.message_id,
            reply_markup: originalKeyboard.reply_markup
        });
    }

    bot.answerCallbackQuery(query.id);
});