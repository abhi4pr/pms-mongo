const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const variable = require('../variables.js');
// const AutoIncrement = require('mongoose-auto-increment');

const exeSumModel = new mongoose.Schema({
    // creator_id:{
    //     type: Number,
    //     required: true
    // },
    sale_booking_execution_id: {
        type: Number,
        required: false,
        default: 0
    },
    sale_booking_id: {
        type: Number,
        required: false,
        default: 0
    },
    start_date_: {
        type: Date,
        default: Date.now
    },
    end_date: {
        type: Date,
        default: Date.now
    },
    summary:{
        type: String,
        required: false,
        default: ""
    },
    remarks:{
        type: String,
        required: false,
        default: ""
    },
    created_by:{
        type: Number,
        required: false,
        default: 0
    },
    last_updated_by:{
        type: Number,
        required: false,
        default: 0
    },
    creation_date:{
        type: Date,
        default: Date.now
    },
    last_updated_date:{
        type: Date,
        default: Date.now
    },
    sale_booking_date:{
        type: Date,
        default: Date.now
    },
    campaign_amount: {
        type: Number,
        required: false,
        default: Date.now
    },
    execution_date:{
        type: Date,
        default: Date.now
    },
    execution_remark:{
        type: String,
        required: false,
        default: ""
    },
    execution_done_by:{
        type: Number,
        required: false,
        default: 0
    },
    cust_name: {
        type: String,
        required: false,
        default: ""
    },
    loggedin_user_id:{
        type: Number,
        required: false,
        default: 0
    },
    execution_status:{
        type: Number,
        required: false,
        default: 0
    },
    payment_update_id: {
        type: Number,
        required: false,
        default: 0
    },
    payment_type:{
        type: String,
        required: false,
        default: ""
    },
    status_desc: {
        type: String,
        required: false,
        default: ""
    },
    invoice_creation_status:{
        type: String,
        required: false,
        default: ""
    },
    manager_approval: {
        type: String,
        required: false,
        default: ""
    },
    invoice_particular:{
        type: String,
        required: false,
        default: ""
    },
    payment_status_show: {
        type: String,
        required: false,
        default: ""
    },
});

// AutoIncrement.initialize(mongoose.connection);
// exeSumModel.plugin(
//     AutoIncrement.plugin, 
//     { model: 'exeSumModels', field: 'creator_id', startAt: 1, incrementBy: 1 }
// );

module.exports = mongoose.model('exeSumModel', exeSumModel);
