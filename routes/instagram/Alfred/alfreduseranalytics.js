const { alfreduseranalytics, getallalfreduseranalytics } = require('../../../controllers/Instagram/Alfred/Alfreduseranalytics');
const { alfredassignedposttoselector } = require('../../../controllers/Instagram/Alfred/Alfredassignedpost');
const express = require('express');
const AlfredRouter = express.Router()


AlfredRouter.post('/alfredassignedposttoselector', alfredassignedposttoselector)
AlfredRouter.get('/alfreduseranalytics', getallalfreduseranalytics)
AlfredRouter.post('/alfreduseranalytics', alfreduseranalytics)

module.exports = AlfredRouter;