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
    s_type: {
        type: String,
        required: false,
        default: ""
    },
    assetsName: {
        type: String,
        required: false,
        default: ""
    },
    assetsOtherID: {
        type: Number,
        required: false,
        default : 0
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
    },
    selfAuditUnit: {
        type: String,
        required: false,
        default:""
    },
    hrAuditPeriod: {
        type: String,
        required: false,
        default: ""
    },
    hrAuditUnit: {
        type: String,
        required: false,
        default:""
    },
    invoiceCopy:{
        type: String,
        required: false,
        default:""
    },
    assetsValue: {
        type: Number,
        required: false,
        default:0
    },
    assetsCurrentValue: {
        type: Number,
        required: false,
        default:0
    },
    Creation_date: {
        type: Date,
        default: Date.now
    },
    Last_updated_date:{
        type: Date,
        default: Date.now
    },
});

AutoIncrement.initialize(mongoose.connection);
simModel.plugin(
    AutoIncrement.plugin, 
    { model: 'simModels', field: 'sim_id', startAt: 1, incrementBy: 1 }
);

module.exports = mongoose.model('simModel', simModel);