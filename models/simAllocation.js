const mongoose = require('mongoose');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('PASS_SALT_KEY');
const jwt = require('jsonwebtoken');
const variable = require('../variables.js');
const AutoIncrement = require('mongoose-auto-increment');

const simAllocationSchema = new mongoose.Schema({
    allo_id:{
        type: Number,
        required: true
    },
    user_id: {
        type: Number,
        required: true
    },
    sim_id: {
        type: Number,
        required: true
    },
    Remarks: {
        type: String,
        required: false,
        default: ""
    },
    dept_id: {
        type: Number,
        required: true,
        default: 0
    },
    created_by: {
        type: Number,
        required: true,
    },
    Creation_date: {
        type: Date,
        default: Date.now
    },
    submitted_by: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        required: false,
        default: ""
    },
    status: {
        type: String,
        required: false,
        default: ""
    },
    deleted_status: {
        type: Number,
        required: true
    },
});

AutoIncrement.initialize(mongoose.connection);
simAllocationSchema.plugin(
    AutoIncrement.plugin,
    {model: 'simAllocation', field: 'allo_id', startAt: 1, incrementBy: 1}
);

module.exports = mongoose.model('simAllocation', simAllocationSchema);