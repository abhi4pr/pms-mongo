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
    type: {
        type: String,
        required: false,
        default: ""
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
    Last_updated_date:{
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
    category_id: {
        type: Number,
        required: true
    },
    sub_category_id: {
        type: Number,
        required: true
    },
    vendor_id: {
        type: Number,
        required: true
    },
    inWarranty:{
        type: String,
        required: false,
        default: ""
    },
    warrantyDate: {
        type: Date,
        default: ""
    },
    dateOfPurchase: {
        type: Date,
        default: ""
    },
    selfAuditPeriod: {
        type: String,
        required: false,
        default: ""
    }
});

AutoIncrement.initialize(mongoose.connection);
simModel.plugin(
    AutoIncrement.plugin, 
    { model: 'simModels', field: 'sim_id', startAt: 1, incrementBy: 1 }
);

module.exports = mongoose.model('simModel', simModel);