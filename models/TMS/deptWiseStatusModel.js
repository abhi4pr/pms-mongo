const { default: mongoose } = require("mongoose");

const deptWiseStatusModel = new mongoose.Schema({
    dept_id: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    created_by: {
        type: Number,
        required: true
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    updated_by: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model(
    "deptWiseStatusModel",
    deptWiseStatusModel
);
