const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-auto-increment');

const roleModel = new mongoose.Schema({
    Role_id:{
        type: Number,
        required: true
    },
    Role_name: { 
        type: String,
        required: false,
        default: "",
    },
    Remarks: {
        type: String,
        required: false,
        default: ""
    },
    Creation_date: {
        type: Date,
        default: Date.now
    },
    Last_update_date: {
        type: Date,
        default: Date.now
    },
    Created_by: {
        type: Number,
        required: false,
        default: 0
    }
});

AutoIncrement.initialize(mongoose.connection);
roleModel.plugin(
    AutoIncrement.plugin, 
    { model: 'roleModels', field: 'Role_id', startAt: 1, incrementBy: 1 }
);

module.exports = mongoose.model('roleModel', roleModel);