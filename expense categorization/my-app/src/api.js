// src/api.js
import axios from 'axios';

// Your API endpoint URL (use your actual API URL)
const API_URL = 'https://6748142d5801f515358f265a.mockapi.io/api/categories/expenses'; 

// Fetch all expenses from API
export const fetchExpenses = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Assuming the response contains an array of expenses
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return []; // Return an empty array in case of error
  }
};

// Add a new expense to the API
export const addExpense = async (expense) => {
  try {
    const response = await axios.post(API_URL, expense);
    return response.data; // Return the added expense
  } catch (error) {
    console.error('Error adding expense:', error);
  }
};

// Delete an expense from the API
export const deleteExpense = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id; // Return the ID of the deleted expense
  } catch (error) {
    console.error('Error deleting expense:', error);
  }
};
