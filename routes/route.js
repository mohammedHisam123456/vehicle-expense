// routes/expenseRoutes.js
const express = require('express');
const Expense = require('../models/schema');
const router = express.Router();

// CREATE - Add a new expense
router.post('/tracker', async (req, res) => {
    try {
        const { date, type, amount, description } = req.body;
        const newExpense = new Expense({ date, type, amount, description });
        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (error) {
        res.status(400).json({ message: 'Error adding expense', error });
    }
});

// READ - Get all expenses
router.get('/tracker', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving expenses', error });
    }
});

// READ - Get an expense by ID
router.get('/:id', async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) return res.status(404).json({ message: 'Expense not found' });
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving expense', error });
    }
});

 //UPDATE - Update an expense by ID
router.put('/tracker/:id', async (req, res) => {
    try {
        const { date, type, amount, description } = req.body;
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            { date, type, amount, description },
            { new: true }
        );
        if (!updatedExpense) return res.status(404).json({ message: 'Expense not found' });
        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(400).json({ message: 'Error updating expense', error });
    }
});


// DELETE - Delete an expense by ID
router.delete('/tracker/:id', async (req, res) => {
    try {
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
        if (!deletedExpense) return res.status(404).json({ message: 'Expense not found' });
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting expense', error });
    }
});

module.exports = router;
