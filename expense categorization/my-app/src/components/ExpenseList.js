import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Item from './Item';

function ExpenseList({ category, items }) {
  return (
    <div className="expense-list">
      <h2>{category} Expenses</h2>
      <Droppable droppableId={category}>
        {(provided) => (
          <div
            className="items"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {items.map((item, index) => (
              <Item key={index} index={index} item={item} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default ExpenseList;
