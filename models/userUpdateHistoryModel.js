const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const AutoIncrement = require('mongoose-sequence')(mongoose);

const userUpdateHistoryModel = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true
    },
    // previous_value: {
    //     type: [String],
    //     required: false,
    //     default: "",
    // },
    // current_value: {
    //     type: [String],
    //     required: false,
    //     default: "",
    // },
    previous_value: Schema.Types.Mixed,
    current_value: Schema.Types.Mixed,
    creation_date: {
        type: Date,
        default: Date.now,
    },
    created_by: {
        type: Number,
        required: false,
        default: 0,
    },
    last_updated_by: {
        type: Number,
        default: 0
    },
    last_updated_date: {
        type: Date,
        default: 0
    }
});

module.exports = mongoose.model("userUpdateHistoryModel", userUpdateHistoryModel);
