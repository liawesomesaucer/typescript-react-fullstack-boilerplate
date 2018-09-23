import React from "react";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { connect } from 'react-redux';

import FieldComponent from 'Boilerplate/components/Fields/Field';
import { createTodo } from 'Boilerplate/modules/todos';
import { Todo, User } from 'Types';

const required = (value: any) => (value ? undefined : 'Required')

const form = reduxForm({
  form: "todoCreate"
});

interface TodoCreateProps {
  handleSubmit (_: Todo): any;
  createTodo (_: Todo): any;
  user: User;
}

const TodoCreate: React.SFC<TodoCreateProps & InjectedFormProps> = ({ handleSubmit, createTodo, user }) => {
  return (
    <div>
      <h4>Create a Todo</h4>
      <label htmlFor="name">Name</label>
      <form
        onSubmit={handleSubmit((todoInfo: Todo) => {
          createTodo({
            ...todoInfo,
            author: user.username,
          })
        })}
      >
        <Field
          type="text"
          id="title"
          name="title"
          component={FieldComponent}
          validate={required}
        />
        <label htmlFor="description">Description</label>
        <Field
          type="text"
          id="description"
          name="description"
          component={FieldComponent}
          validate={required}
        />
        <button
          type="submit"
          className="btn"
        >
          Create
        </button>
      </form>
    </div>
  );
};

function mapStateToProps(state: any) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message,
    user: state.auth.user,
  };
}

export default connect(
  mapStateToProps, { createTodo }
)(form(TodoCreate));

