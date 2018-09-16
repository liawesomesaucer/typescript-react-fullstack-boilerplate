import React from "react";
import { Link } from "react-router-dom";
import TodoCreate from "Boilerplate/scenes/Todos/components/TodoCreate";

const Todos: React.SFC = () => {
  return (
    <div>
      <TodoCreate />
      <Link to="/thistodo">Login</Link>
    </div>
  );
};

export default Todos;
