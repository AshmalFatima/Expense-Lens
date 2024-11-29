// src/components/ExpenseItem.js
import React from 'react';

const ExpenseItem = ({ expense, onDelete }) => {
  return (
    <div className="expense-item">
      <span>{expense.name} - ${expense.amount.toFixed(2)}</span>
      <button className="btn btn-danger btn-sm" onClick={() => onDelete(expense)}>
        Delete
      </button>
    </div>
  );
};

export default ExpenseItem;
