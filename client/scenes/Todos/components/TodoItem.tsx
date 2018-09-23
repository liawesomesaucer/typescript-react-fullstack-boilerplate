import React from 'react';
import { Link } from 'react-router-dom';

import { Todo } from 'Types';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.SFC<TodoItemProps> = ({ todo }) => {
  const { author, title, _id } = todo;
  return (
    <Link className="todo__card" to={`/todos/${_id}`}>
      <p className="todo__card-title">{title}</p>
      <p className="todo__card-author">By {author}</p>
    </Link>
  );
};

export default TodoItem;
