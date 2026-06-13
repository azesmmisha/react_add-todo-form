import './App.scss';
import { TodoForm } from './components/TodoForm/TodoForm';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './interfaces/Todo';

export const App = () => {
  const enrichTodos = (todos: Todo[]) => {
    return todos.map(todo => ({
      ...todo,
      user: usersFromServer.find(u => u.id === todo.userId),
    }));
  };

  const [todos, setTodos] = useState<Todo[]>(enrichTodos(todosFromServer));

  const getNewId = () => {
    return Math.max(...todos.map(todo => todo.id)) + 1;
  };

  const handleAdd = ({ title, userId }: { title: string; userId: number }) => {
    const user = usersFromServer.find(u => u.id === userId);

    const newTodo: Todo = {
      id: getNewId(),
      title,
      userId,
      completed: false,
      user,
    };

    setTodos(prev => [...prev, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onAdd={handleAdd} />
      <TodoList todos={todos} />
    </div>
  );
};
