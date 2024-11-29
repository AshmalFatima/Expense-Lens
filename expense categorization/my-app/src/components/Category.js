// src/components/Category.js
import React from 'react';
import ExpenseItem from './ExpenseItem';

const Category = ({ category, expenses, onDelete }) => {
  const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div className="category-container">
      <div className="category-header">
        <h5>{category}</h5>
        <p>Total: ${totalAmount.toFixed(2)}</p>
      </div>
      <div className="category-items">
        {expenses.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

export default Category;
