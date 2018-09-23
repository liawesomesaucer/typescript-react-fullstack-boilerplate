import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm, InjectedFormProps } from "redux-form";

import { registerUser, RegisterInfo } from "Boilerplate/modules/auth";
import Toast from 'Boilerplate/components/Toast';

import FieldComponent from 'Boilerplate/components/Fields/Field';
import PasswordFieldComponent from 'Boilerplate/components/Fields/PasswordField';

const required = (value: any) => (value ? undefined : 'Required')

const form = reduxForm({
  form: "register"
});

interface RegisterProps {
  registerUser: (_: RegisterInfo) => any;
  handleSubmit: (_: any) => any;
  errorMessage: string;
}

const Register: React.SFC<RegisterProps & InjectedFormProps> = ({ handleSubmit, registerUser, errorMessage }) => {
  return (
    <div className="container">
      <h3>Register for Boilerplate</h3>
      <form onSubmit={handleSubmit((registerInfo: RegisterInfo) => registerUser(registerInfo))}>
        {errorMessage && <Toast text={errorMessage} type="error" />}
        <label htmlFor="username">Username</label>
        <Field
          id="username"
          name="username"
          component={FieldComponent}
          type="text"
          validate={required}
        />
        <label htmlFor="password">Password</label>
        <Field
          id="password"
          name="password"
          component={PasswordFieldComponent}
          type="password"
          validate={required}
        />
        <button type="submit" className="btn">
          Register
        </button>
      </form>
    </div>
  );
}

function mapStateToProps(state: any) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message
  };
}

export default connect(
  mapStateToProps,
  { registerUser }
)(form(Register));
