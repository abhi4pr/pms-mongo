const { callBotTools } = require('../../../controllers/Instagram/Bot_Tools/BotX');
const express = require('express');
const BotXRouter = express.Router()


BotXRouter.get('/call_bot_tool', callBotTools)

module.exports = BotXRouter;