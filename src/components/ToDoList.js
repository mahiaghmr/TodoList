import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo, ModifyTodo, deleteTodo } from '../features/todosSlice';

const ToDoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.todos);
  const todoStatus = useSelector(state => state.todos.status);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    if (todoStatus === 'idle') {
      dispatch(fetchTodos());
    }
  }, [todoStatus, dispatch]);

  const handleAddTodo = () => {
    if (newTodo) {
      dispatch(addTodo({ title: newTodo, completed: false }));
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (todoId) => {
    dispatch(deleteTodo(todoId));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-500">To-Do List</h1>
      
      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-1/2"
        />
        <button
          onClick={handleAddTodo}
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Add
        </button>
      </div>

      <ul className="space-y-4">
        {todos.map(todo => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-white shadow-md rounded-lg px-4 py-3 border border-gray-200"
          >
            <span
              className={`text-lg ${todo.completed ? 'line-through text-gray-500' : ''}`}
            >
              {todo.title}
            </span>
            <div className="flex space-x-4">
              <button
                onClick={() => dispatch(ModifyTodo(todo))}
                className={`px-4 py-2 rounded-lg transition duration-300 ${
                  todo.completed
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-500 text-white hover:bg-gray-600'
                }`}
              >
                {todo.completed ? 'Undo' : 'Complete'}
              </button>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
