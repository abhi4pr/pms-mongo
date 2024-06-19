const mongoose = require("mongoose");
const constant = require("../../common/constant");
const Schema = mongoose.Schema;

const salesIncentivePlan = new Schema({
    sales_service_master_id: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: "salesServiceMasterModel",
    },
    incentive_type: {
        type: String,
        required: true,
        enum: ["fixed", "varaible"],
    },
    value: {
        type: Number,
        required: true
    },
    remarks: {
        type: String,
        required: false,
    },
    created_by: {
        type: Number,
        required: false,
    },
    updated_by: {
        type: Number,
        required: false,
    },
    status: {
        type: Number,
        required: false,
        default: constant?.ACTIVE,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('salesIncentivePlanModel', salesIncentivePlan);