import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

function Item({ item, index, category, onDelete }) {
  return (
    <Draggable draggableId={item} index={index}>
      {(provided) => (
        <div
          className="item"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {item}
          <button onClick={() => onDelete(category, item)}>Delete</button>
        </div>
      )}
    </Draggable>
  );
}

export default Item;
