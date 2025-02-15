const TelegramBot = require("node-telegram-bot-api");

const TOKEN = "6436341565:AAF9bPKkb3Uqkd_X6ZoxmDMtqCWAvBs4U_E";
const bot = new TelegramBot(TOKEN, { webHook: true });

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

// Обработка нажатий на inline-кнопки
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;

    if (query.data === 'DeepLift') {
        const username = query.from.username || "";

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