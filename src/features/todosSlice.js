import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  todos: [],
  status: 'idle',
  error: null
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get('http://localhost:5000/todos');
  return response.data;
});


export const addTodo = createAsyncThunk('todos/addTodo', async (newTodo) => {
  const response = await axios.post('http://localhost:5000/todos', newTodo);
  return response.data;
});


export const ModifyTodo = createAsyncThunk('todos/ModifyTodo', async (todo) => {
  const response = await axios.put(`http://localhost:5000/todos/${todo.id}`, {
    ...todo, completed: !todo.completed
  });
  return response.data;
});


export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (todoId) => {
  await axios.delete(`http://localhost:5000/todos/${todoId}`);
  return todoId;
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(ModifyTodo.fulfilled, (state, action) => {
        const updatedTodo = action.payload;
        const existingTodo = state.todos.find(todo => todo.id === updatedTodo.id);
        if (existingTodo) {
          existingTodo.completed = updatedTodo.completed;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
      });
  },
});

export default todosSlice.reducer;
