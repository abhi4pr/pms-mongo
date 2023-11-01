const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

const financeModel = new mongoose.Schema({
    id:{
        type: Number,
        required: true
    },
    status_: { 
        type: Boolean,
        required: false,
        default: "",
    },
    reason: {
        type: String,
        required: false,
        default: ""
    },
    remark: {
        type: String,
        required: false,
        default: ""
    },
    date:{
        type: Date,
        default: Date.now
    },
    screenshot:{
        type: String,
        required: false
    },
    attendence_id:{
        type: Number,
        required: true
    },
    reference_no:{
        type: Number,
        required: false
    },
    amount:{
        type: Schema.Types.Decimal128,
    },
    pay_date:{
        type: Date
    }
});

AutoIncrement.initialize(mongoose.connection);
financeModel.plugin(
    AutoIncrement.plugin, 
    { model: 'financeModels', field: 'id', startAt: 1, incrementBy: 1 }
);

module.exports = mongoose.model('financeModel', financeModel);