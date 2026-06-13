import './App.scss';
import { TodoForm } from './components/TodoForm/TodoForm';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './interfaces/Todo';

export const App = () => {
  const [users] = useState(usersFromServer);
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm
        onAdd={todo => {
          const user = users.find(u => u.id === todo.userId);

          setTodos([...todos, { ...todo, user }]);
        }}
        users={users}
        todos={todos}
      />

      <TodoList todos={todos} />
    </div>
  );
};
