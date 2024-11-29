import React, { useState, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchExpenses, addExpense, deleteExpense } from './api'; // Import API functions

function App() {
  const [categories, setCategories] = useState({});
  const [newExpense, setNewExpense] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');
  const [newCategory, setNewCategory] = useState('Entertainment');
  const [searchQuery, setSearchQuery] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categoryToEdit, setCategoryToEdit] = useState('');
  const [editingCategory, setEditingCategory] = useState('');
  const [isAdding, setIsAdding] = useState(false); // Added state to disable button

  const isProcessingRef = useRef(false); // Ref to track if the function is processing

  useEffect(() => {
    const getExpenses = async () => {
      const data = await fetchExpenses();
      const categorizedExpenses = categorizeExpenses(data);
      setCategories(categorizedExpenses);
    };
    getExpenses();
  }, []);

  const categorizeExpenses = (expenses) => {
    return expenses.reduce((acc, expense) => {
      const category = expense.category || 'Uncategorized';
      if (!acc[category]) acc[category] = [];
      acc[category].push(expense);
      return acc;
    }, {});
  };

  const handleAddExpense = async () => {
    if (newExpense && newExpenseAmount && !isAdding) {
      // Prevent running the function twice if it's already being processed
      setIsAdding(true); // Disable the button
      const expense = {
        name: newExpense,
        amount: parseFloat(newExpenseAmount),
        category: newCategory,
      };

      try {
        const addedExpense = await addExpense(expense);
        setCategories((prevState) => {
          const updatedCategories = { ...prevState };
          if (!updatedCategories[newCategory]) {
            updatedCategories[newCategory] = [];
          }
          updatedCategories[newCategory].push(addedExpense);
          return updatedCategories;
        });

        // Clear input fields after adding expense
        setNewExpense('');
        setNewExpenseAmount('');
      } catch (error) {
        console.error('Error adding expense', error);
      } finally {
        setIsAdding(false); // Re-enable the button after adding
      }
    }
  };

  const handleDeleteExpense = async (category, expense) => {
    const expenseId = expense.id;
    const deletedExpenseId = await deleteExpense(expenseId);
    setCategories((prevState) => {
      const updatedCategories = { ...prevState };
      updatedCategories[category] = updatedCategories[category].filter(item => item.id !== deletedExpenseId);
      return updatedCategories;
    });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const generateReport = () => {
    let report = '<h2>Expense Report</h2>';
    Object.keys(categories).forEach(category => {
      const totalExpenses = categories[category].length;
      const totalAmount = categories[category].reduce((total, expense) => total + expense.amount, 0);
      report += `
        <h3>${category}</h3>
        <p>Total Expenses: ${totalExpenses}</p>
        <p>Total Amount: $${(isNaN(totalAmount) ? 0 : totalAmount).toFixed(2)}</p>
        <table border="1" cellpadding="5" cellspacing="0">
          <tr>
            <th>Expense</th>
            <th>Amount</th>
          </tr>
          ${categories[category].map(expense => `
            <tr>
              <td>${expense.name}</td>
              <td>$${expense.amount.toFixed(2)}</td>
            </tr>
          `).join('')}
        </table>
        <br>
      `;
    });

    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Expense Report</title></head><body>');
    printWindow.document.write(report);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  const filterExpenses = (category) => {
    return categories[category].filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const calculateTotalAmount = (category) => {
    const total = categories[category].reduce((total, expense) => total + expense.amount, 0);
    return isNaN(total) ? 0 : total;
  };

  const handleAddCategory = () => {
    if (newCategoryName && !categories[newCategoryName]) {
      setCategories({ ...categories, [newCategoryName]: [] });
      setNewCategoryName('');
    }
  };

  const handleEditCategory = () => {
    if (categoryToEdit && newCategoryName) {
      const updatedCategories = { ...categories };
      updatedCategories[newCategoryName] = updatedCategories[categoryToEdit];
      delete updatedCategories[categoryToEdit];
      setCategories(updatedCategories);
      setCategoryToEdit('');
      setNewCategoryName('');
      setEditingCategory('');
    }
  };

  const handleDeleteCategory = (category) => {
    const updatedCategories = { ...categories };
    delete updatedCategories[category];
    setCategories(updatedCategories);
  };

  const handleStartEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategoryName(category);
  };

  const handleCancelEditCategory = () => {
    setEditingCategory('');
    setNewCategoryName('');
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCategory = source.droppableId;
    const destinationCategory = destination.droppableId;

    if (sourceCategory === destinationCategory) {
      const items = Array.from(categories[sourceCategory]);
      const [removed] = items.splice(source.index, 1);
      items.splice(destination.index, 0, removed);
      setCategories({
        ...categories,
        [sourceCategory]: items,
      });
    } else {
      const sourceItems = Array.from(categories[sourceCategory]);
      const destinationItems = Array.from(categories[destinationCategory]);
      const [removed] = sourceItems.splice(source.index, 1);
      destinationItems.splice(destination.index, 0, removed);

      setCategories({
        ...categories,
        [sourceCategory]: sourceItems,
        [destinationCategory]: destinationItems,
      });
    }
  };

  const getTopCategories = () => {
    const categoryTotals = Object.keys(categories).map((category) => {
      const totalAmount = calculateTotalAmount(category);
      return {
        name: category,
        totalAmount,
        expenseCount: categories[category].length,
      };
    });

    return categoryTotals.sort((a, b) => b.totalAmount - a.totalAmount).slice(0, 3);
  };

  return (
    <div className="App container mt-5">
      <h1 className="text-center mb-4">Expense Lens</h1>
      <p className="text-center mb-4" style={{ fontSize: '1.25rem', fontWeight: '500', color: '#4A90E2', lineHeight: '1.6' }}>
  Take control of your spending with <span style={{ fontWeight: '700', color: '#28a745' }}>Expense Lens</span> – track, organize, and analyze your expenses effortlessly.
</p>



      {/* Top 3 Categories Section */}
      <div className="row mb-4">
        {getTopCategories().map((category, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className="card shadow-lg border-light rounded">
              <div className="card-body">
                <h5 className="card-title text-center text-uppercase">{category.name}</h5>
                <p className="card-text text-center">
                  <strong>Total Expenses:</strong> ${category.totalAmount.toFixed(2)}
                </p>
                <p className="card-text text-center">
                  This category includes <strong>{category.expenseCount}</strong> expenses.
                </p>
                <div className="d-flex justify-content-center mt-3">
                  
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>


      <div className="row mb-4">
        <div className="col-md-3">
          <input
            className="form-control mb-2"
            type="text"
            placeholder="New expense"
            value={newExpense}
            onChange={(e) => setNewExpense(e.target.value)}
          />
          <input
            className="form-control mb-2"
            type="number"
            placeholder="Amount"
            value={newExpenseAmount}
            onChange={(e) => setNewExpenseAmount(e.target.value)}
          />
          <select
            className="form-control mb-2"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          >
            {Object.keys(categories).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button
            className="btn btn-primary w-100"
            onClick={handleAddExpense}
            disabled={isAdding}
          >
            {isAdding ? 'Adding...' : 'Add Expense'}
          </button>
        </div>
        <div className="col-md-3">
          <input
            className="form-control mb-2"
            type="text"
            placeholder="Search expenses"
            onChange={handleSearch}
          />
          <button className="btn btn-success w-100" onClick={generateReport}>Generate Report</button>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-3">
          <input
            className="form-control mb-2"
            type="text"
            placeholder="New category name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <button className="btn btn-info w-100 mb-2" onClick={handleAddCategory}>Add Category</button>
          {editingCategory && (
            <>
              <button className="btn btn-warning w-100 mb-2" onClick={handleEditCategory}>Edit Category</button>
              <button className="btn btn-secondary w-100 mb-2" onClick={handleCancelEditCategory}>Cancel</button>
            </>
          )}
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="row">
          {Object.keys(categories).map((category) => (
            <div className="col-md-4 mb-4" key={category}>
              <Droppable droppableId={category}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="category"
                  >
                    <h4>{category}</h4>
                    <button
                      className="btn btn-primary btn-sm mb-2"
                      onClick={() => handleDeleteCategory(category)}
                    >
                      Delete Category
                    </button>
                    <button
                      className="btn btn-warning btn-sm mb-2"
                      onClick={() => handleStartEditCategory(category)}
                    >
                      Edit Category
                    </button>

                    <p>Total: ${calculateTotalAmount(category).toFixed(2)}</p>
                    {filterExpenses(category).map((expense, index) => (
                      <Draggable key={expense.name} draggableId={expense.name} index={index}>
                        {(provided) => (
                          <div
                            className={`expense-item ${expense.name.toLowerCase().includes(searchQuery.toLowerCase()) ? 'highlight' : ''}`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <p>{expense.name} - ${expense.amount.toFixed(2)}</p>
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() => handleDeleteExpense(category, expense)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
