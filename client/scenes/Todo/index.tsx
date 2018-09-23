import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { connect } from 'react-redux';
import { Todo as TodoType } from 'Types';
import { loadTodo } from '../../modules/todos';

interface TodoProps extends RouteComponentProps<any> {
  todo: TodoType,
  loadTodo: (_id: any) => any
}

class Todo extends React.Component<TodoProps> {
  componentWillMount() {
    this.props.loadTodo(this.props.match.params.todoId);
  }

  render() {
    const { todo } = this.props;
    if (!todo) {
      return (
        <div className="container"><p>Loading</p></div>
      );
    }
    const { title, description, author } = todo;

    return (
      <div className="container">
        <h1>{title}</h1>
        <p>By {author}</p>
        <p>{description}</p>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    todo: state.todos.todo,
  };
}

export default connect(mapStateToProps, { loadTodo })(Todo);
