// models/Expense.js
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    type: {
        type: String,
        required: true,
        enum: ['fuel', 'repair', 'maintenance'],
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model('Expense', expenseSchema);
