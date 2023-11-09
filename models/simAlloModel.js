const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-auto-increment');

const simAlloModel = new mongoose.Schema({
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
    submitted_at: {
        type: String,
        default: ""
    },
    submitted_by: {
        type: Number,
        required: false
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
        required: false,
        default: 0
    },
});

AutoIncrement.initialize(mongoose.connection);
simAlloModel.plugin(
    AutoIncrement.plugin,
    {model: 'simAlloModels', field: 'allo_id', startAt: 1, incrementBy: 1}
);

module.exports = mongoose.model('simAlloModel', simAlloModel);