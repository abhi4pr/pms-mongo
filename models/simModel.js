const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-auto-increment');

const simModel = new mongoose.Schema({
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
simModel.plugin(
    AutoIncrement.plugin, 
    { model: 'simModels', field: 'sim_id', startAt: 1, incrementBy: 1 }
);

module.exports = mongoose.model('simModel', simModel);