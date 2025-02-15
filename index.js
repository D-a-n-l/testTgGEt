const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
app.use(express.json());

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
    const chatId = msg.chat.id;

    const keyboard = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Нажми меня', callback_data: 'change_buttons' }]
            ]
        }
    };

    bot.sendMessage(chatId, 'Нажмите кнопку ниже:', keyboard);
});

// Обработка нажатий на inline-кнопки
bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;

    if (query.data === 'change_buttons') {
        const newKeyboard = {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Кнопка 1', callback_data: 'btn1' },
                        { text: 'Кнопка 2', callback_data: 'btn2' }
                    ],
                    [{ text: 'Назад', callback_data: 'back' }]
                ]
            }
        };

        await bot.editMessageText('Выберите новую кнопку:', {
            chat_id: chatId,
            message_id: query.message.message_id,
            reply_markup: newKeyboard.reply_markup
        });
    }

    if (query.data === 'back') {
        const originalKeyboard = {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Нажми меня', callback_data: 'change_buttons' }]
                ]
            }
        };

        await bot.editMessageText('Нажмите кнопку ниже:', {
            chat_id: chatId,
            message_id: query.message.message_id,
            reply_markup: originalKeyboard.reply_markup
        });
    }

    await bot.answerCallbackQuery(query.id); // Убираем значок загрузки на кнопке
});