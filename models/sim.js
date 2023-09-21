const mongoose = require('mongoose');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('PASS_SALT_KEY');
const jwt = require('jsonwebtoken');
const variable = require('../variables.js');
const AutoIncrement = require('mongoose-auto-increment');

const simSchema = new mongoose.Schema({
    sim_id: { 
        type: Number,
        required: true,
        unique: true,
    },
    sim_no: {
        type: Number,
        required: true,
        unique: true
    },
    provider: {
        type: String,
        required: true
    },
    Remarks: {
        type: String,
        required: false,
        default: ""
    },
    created_by: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: "",
    },
    register: {
        type: String,
        default: ""
    },
    mobileNumber: {
        type: Number,
        required: true,
        unique: true
    },
    s_type: {
        type: String,
        required: false,
        default: ""
    },
    Creation_date: {
        type: Date,
        default: Date.now
    },
    desi: {
        type: Number,
        required: true
    },
    dept: {
        type: Number,
        required: true
    },
});

AutoIncrement.initialize(mongoose.connection);
simSchema.plugin(
    AutoIncrement.plugin, 
    { model: 'sim', field: 'sim_id', startAt: 1, incrementBy: 1 }
);

module.exports = mongoose.model('sim', simSchema);
