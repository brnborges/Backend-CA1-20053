const mongoose = require('mongoose');

const accounts = new mongoose.Schema({
    accountNumber: {
        type: String,
        lowercase: true,
    },
    password: {
        type: String,
        lowercase: true,
    },
    userName: {
        type: String,
        unique: true,
        lowercase: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Accounts = mongoose.model('accounts', accounts);