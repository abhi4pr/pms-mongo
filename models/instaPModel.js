const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const variable = require('../variables.js');
// const AutoIncrement = require('mongoose-auto-increment');

const instaPModel = new mongoose.Schema({
    // post_id:{
    //     type: Number,
    //     required: true
    // },
    postType:{
        type: String,
        required: false,
        default: ""
    },    
    creatorName: {
        type: String,
        required: false,
        default: ""
    },
    allComments: {
        type: Number,
        required: false,
        default: 0
    },
    todayComment: {
        type: Number,
        required: false,
        default: 0
    },
    pastComment: {
        type: Number,
        required: false,
        default: 0
    },
    allLike:{
        type: Number,
        required: false,
        default: 0
    },
    todayLike:{
        type: Number,
        required: false,
        default: 0
    },
    pastLike:{
        type: Number,
        required: false,
        default: 0
    },
    allView:{
        type: Number,
        required: false,
        default: 0
    },
    todayView:{
        type: Number,
        required: false,
        default: 0
    },
    pastView:{
        type: Number,
        required: false,
        default: 0
    },
    title:{
        type: String,
        required: false,
        default: ""
    },
    postedOn:{
        type: String,
        required: false,
        default: ""
    },
    postUrl:{
        type: String,
        required: false,
        default: ""
    },
    postImage:{
        type: String,
        required: false,
        default: ""
    },
    shortCode:{
        type: String,
        required: false,
        default: ""
    },
    posttype_decision:{
        type: Number,
        required: false,
        default: 0
    },
    selector_name:{
        type: Number,
        required: false,
        default: 0
    },
    interpretor_name:{
        type: Number,
        required: false,
        default: 0
    },
    auditor_name:{
        type: Number,
        required: false,
        default: 0
    },
    auditor_decision:{
        type: Number,
        required: false,
        default: 0
    },
    interpretor_decision:{
        type: Number,
        required: false,
        default: 0
    },
    selector_decision:{
        type: Number,
        required: false,
        default: 0
    },
    dateCol: {
        type: Date,
        default: Date.now
    },
});

// AutoIncrement.initialize(mongoose.connection);
// instaPModel.plugin(
//     AutoIncrement.plugin, 
//     { model: 'instaPModels', field: 'post_id', startAt: 1, incrementBy: 1 }
// );

module.exports = mongoose.model('instaPModel', instaPModel);
