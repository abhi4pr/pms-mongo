const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-auto-increment');

const userModel = new mongoose.Schema({
    user_id:{
        type: Number,
        required: true
    }
});

AutoIncrement.initialize(mongoose.connection);
userModel.plugin(
    AutoIncrement.plugin, 
    { model: 'userModels', field: 'user_id', startAt: 1, incrementBy: 1 }
);

module.exports = mongoose.model('userModel', userModel);