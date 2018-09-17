import React from "react";
import { Link } from "react-router-dom";
import TodoCreate from "Boilerplate/scenes/Todos/components/TodoCreate";

const Todos: React.SFC = () => {
  return (
    <div className="container">
      <TodoCreate />
    </div>
  );
};

export default Todos;
