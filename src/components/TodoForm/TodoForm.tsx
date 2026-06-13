import { useState } from 'react';
import { User } from '../../interfaces/User';
import { Todo } from '../../interfaces/Todo';

type Props = {
  onAdd: (todo: Todo) => void;
  users: User[];
  todos: Todo[];
};

export const TodoForm: React.FC<Props> = ({ onAdd, users, todos }) => {
  const [title, setTitle] = useState('');
  const [titleTouched, setTitleTouched] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userIdTouched, setUserIdTouched] = useState(false);

  const titleError = titleTouched && !title;
  const userIdError = userIdTouched && !userId;

  const getNewId = () => {
    return Math.max(...todos.map(todo => todo.id)) + 1;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleTouched(true);
    setUserIdTouched(true);

    if (!title || !userId) {
      return;
    }

    onAdd({
      id: getNewId(),
      title,
      userId,
      completed: false,
    });

    setTitle('');
    setUserId(0);
    setTitleTouched(false);
    setUserIdTouched(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          name="title"
          placeholder="Enter a title"
          value={title}
          onChange={event => setTitle(event.target.value)}
          onBlur={() => setTitleTouched(true)}
        />
        {titleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={userId}
          onChange={e => setUserId(Number(e.target.value))}
          onBlur={() => setUserIdTouched(true)}
        >
          <option value={0} disabled>
            Choose a user
          </option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {userIdError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
