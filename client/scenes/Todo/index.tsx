import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { connect } from 'react-redux';
import { Todo as TodoType } from 'Types';
import { loadTodo, finishTodo } from '../../modules/todos';

interface TodoProps extends RouteComponentProps<any> {
  todo: TodoType,
  loadTodo: (_id: any) => any
  finishTodo: (_id: any) => any
}

class Todo extends React.Component<TodoProps> {
  constructor(props: TodoProps) {
    super(props);

    this.finishTodo = this.finishTodo.bind(this);
  }
  componentWillMount() {
    this.props.loadTodo(this.props.match.params.todoId);
  }

  finishTodo() {
    this.props.finishTodo(this.props.match.params.todoId);
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
        <Link to="/todos">Back</Link>
        <h1>{title}</h1>
        <p>By {author}</p>
        <p>{description}</p>
        <button
          className="btn"
          onClick={this.finishTodo}
        >
          Mark as done
        </button>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    todo: state.todos.todo,
  };
}

export default connect(mapStateToProps, { loadTodo, finishTodo })(Todo);
