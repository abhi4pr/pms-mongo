const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salesInvoiceParticular = new Schema({
    invoice_particular_name: {
        type: String,
        required: false,
    },
    remarks: {
        type: String,
        required: false
    },
    managed_by: {
        type: Number,
        required: false
    },
    created_by: {
        type: Number,
        required: true,
        default: 0,
    },
    last_updated_by: {
        type: Number,
        required: false,
        default: 0
    }
},
    { timestamps: true },
);
module.exports = mongoose.model('salesInvoiceParticular', salesInvoiceParticular);