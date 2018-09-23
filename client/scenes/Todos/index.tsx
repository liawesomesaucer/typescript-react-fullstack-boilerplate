import React from "react";
import { connect } from 'react-redux';

import TodoCreate from "./components/TodoCreate";
import TodoItem from "./components/TodoItem";
import { loadTodos } from '../../modules/todos';

interface TodosProps {
  todos: Array<any>;
  authenticated: boolean;
  loadTodos(): any;
}

class Todos extends React.Component<TodosProps>  {
  componentWillMount() {
    this.props.loadTodos();
  }

  render() {
    const { todos, authenticated } = this.props;
    return (
      <div className="container">
        <h1>Todos</h1>
        <div>
          {todos && todos.length
            ? todos.map(todo => <TodoItem todo={todo} />)
            : <p>No Todos. {authenticated ? 'Start by creating one.' : 'Need to log in?'}</p>
          }
        </div>
        {authenticated && <TodoCreate />}
      </div>
    );
  }
};

function mapStateToProps(state: any) {
  return {
    todos: state.todos.todos,
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, { loadTodos })(Todos);
