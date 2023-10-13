const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const variable = require('../variables.js');
// const AutoIncrement = require('mongoose-auto-increment');

const instaSModel = new mongoose.Schema({
    mediaCont:{
        type: Number,
        required: false,
        default: 0
    },    
    expiredAt: {
        type: Date,
        required: false,
        default: Date.now
    },
    savedOn: {
        type: Date,
        required: false,
        default: Date.now
    },
    shortcode: {
        type: String,
        required: false,
        default: ""
    },
    links: {
        type: Array,
        required: false,
        default: []
    },
    hashtags: {
        type: Array,
        required: false,
        default: []
    },
    mentions: {
        type: Array,
        required: false,
        default: []
    },
    locations: {
        type: Array,
        required: false,
        default: []
    }
});

module.exports = mongoose.model('instaSModel', instaSModel);
