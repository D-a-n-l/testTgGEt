const TelegramBot = require("node-telegram-bot-api");

const TOKEN = "6436341565:AAF9bPKkb3Uqkd_X6ZoxmDMtqCWAvBs4U_E";
const bot = new TelegramBot(TOKEN, { webHook: true });

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        res.status(200).end(); // Отвечаем сразу, чтобы Telegram не повторял запрос
        process.nextTick(() => bot.processUpdate(req.body));
    } else {
        res.status(200).send('Bot is enable');
    }
};

bot.onText(/\/start/, async (msg) => {
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

    await bot.sendMessage(msg.chat.id, 'Выберите игру:', keyboard);
});

bot.on('callback_query', async (query) => {
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

        await bot.editMessageText('Выберите действие:', {
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

        await bot.editMessageText('Выберите действие:', {
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

        await bot.editMessageText('Нажмите кнопку ниже:', {
            chat_id: chatId,
            message_id: query.message.message_id,
            reply_markup: originalKeyboard.reply_markup
        });
    }

    await bot.answerCallbackQuery(query.id);
});