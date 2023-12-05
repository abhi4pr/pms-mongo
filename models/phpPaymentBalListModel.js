const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const variable = require('../variables.js');

const phpPaymentBalListModel = new mongoose.Schema({
    sale_booking_id: {
        type: Number,
        required: false
    },
    campaign_amount: {
        type: Number,
        required: false
    },
    sale_booking_date: {
        type: String,
        required: false
    },
    user_id: {
        type: Number,
        required: false
    },
    created_by: {
        type: Number,
        required: false
    },
    manager_approval: {
        type: Number,
        required: false
    },
    invoice_creation_status: {
        type: Number,
        required: false
    },
    salesexe_credit_approval: {
        type: Number,
        required: false
    },
    payment_update_id: {
        type: Number,
        required: false
    },
    payment_amount: {
        type: Number,
        required: false
    },
    payment_type: {
        type: String,
        required: false
    },
    cust_name: {
        type: String,
        required: false
    },
    total_paid_amount: {
        type: Number,
        required: false
    },
    sno: {
        type: Number,
        required: false
    },
    cust_id: {
        type: Number,
        required: false  
    },
    base_amount: {
        type: Number,
        required: false 
    },
    gst_amount: {
        type: Number,
        required: false
    },
    net_amount:{
        type: Number,
        required: false
    },
    campaign_amount_without_gst: {
        type: Number,
        required: false
    },
    balance: {
        type: Number,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    status_desc: {
        type: String,
        required: false
    },
    invoice : {
        type: String,
        required: false
    },
    invoice_particular : {
        type: String,
        required: false
    },
    invoice_action_reason : {
        type: String,
        required: false
    },
    salesexe_credit_used : {
        type: Number,
        required: false
    },
    execution_approval : {
        type: Number,
        required: false
    },
    last_action_reason : {
        type: String,
        required: false
    },
    execution_date : {
        type: String,
        required: false
    },
    execution_remark : {
        type: String,
        required: false
    },
    execution_done_by : {
        type: Number,
        required: false
    },
    execution_summary : {
        type: String,
        required: false
    },
    reason_credit_approval : {
        type: String,
        required: false
    },
    fixed_credit_approval_reason : {
        type: Number,
        required: false
    },
    balance_payment_ondate : {
        type: String,
        required: false
    },
    gst_status :{
        type: Number,
        required: false
    },
    tds_status : {
        type: Number,
        required: false
    },
    close_date : {
        type: String,
        required: false
    },
    verified_amount : {
        type: Number,
        required: false
    },
    verified_remark : {
        type: String,
        required: false
    },
    sale_booking_file : {
        type: String,
        required: false
    },
    remarks : {
        type: String,
        required: false
    },
    no_incentive : {
        type: Number,
        required: false
    },
    old_sale_booking_id : {
        type: Number,
        required: false
    },
    sale_booking_type : {
        type: Number,
        required: false
    },
    rs_sale_booking_id : {
        type: Number,
        required: false
    },
    service_taken_amount : {
        type: Number,
        required: false
    },
    last_updated_by : {
        type: Number,
        required: false
    },
    creation_date : {
        type: Date,
        default : Date.now
    },
    last_updated_date : {
        type: Date,
        default : Date.now
    },
    invoice_particular_id : {
        type: Number,
        required: false
    },
    invoice_particular_name : {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('phpPaymentBalListModel', phpPaymentBalListModel);