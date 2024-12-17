import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Task.css';
import './style.scss';

const Task = ({ task, index, isEditing, handleChangeTaskContent, handleEdit, handleCancelEdit, handleChooseEditTask, handleDeleteTask }) => {
  return (
    <Draggable draggableId={task.get('id')} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="task card mb-2 p-2"
        >
          {isEditing ? (
            <div className="d-flex flex-column">
              <input
                type="text"
                className="form-control mb-2"
                value={task.get('content')}
                onChange={handleChangeTaskContent}
              />
              <div className="btn-group">
                <button className="btn btn-success btn-sm" onClick={handleEdit}>
                  <i className="bi bi-check-lg"></i> Save
                </button>
                <button className="btn btn-secondary btn-sm" onClick={handleCancelEdit}>
                  <i className="bi bi-x-lg"></i> Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <span>{task.get('content')}</span>
                <div className="btn-group">
                  <button className="btn btn-outline-primary btn-sm" onClick={handleChooseEditTask}>
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button className="btn btn-outline-danger btn-sm" onClick={handleDeleteTask}>
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
              <small className="text-muted">{task.get('time')}</small>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default React.memo(Task);