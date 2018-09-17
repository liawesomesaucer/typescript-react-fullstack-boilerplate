import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm, InjectedFormProps } from "redux-form";

import { loginUser, LoginInfo } from "Boilerplate/modules/auth";
import Toast from 'Boilerplate/components/Toast';

const form = reduxForm({
  form: "login"
});

interface LoginProps {
  errorMessage: string;
  loginUser: (_: LoginInfo) => any;
  handleSubmit: (_: any) => any;
}

const Login: React.SFC<LoginProps & InjectedFormProps> = ({ errorMessage, handleSubmit, loginUser }) => {
  return (
    <div className="container">
      <h3>Login to Boilerplate</h3>
      <form onSubmit={handleSubmit((loginInfo: LoginInfo) => loginUser(loginInfo))}>
        {errorMessage && <Toast text={errorMessage} type="error" />}
        <div>
          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            className="form-control"
            component="input"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Field
            id="password"
            name="password"
            className="form-control"
            component="input"
            type="password"
          />
        </div>
        <button type="submit" className="btn">
          Login
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
  mapStateToProps, { loginUser }
)(form(Login));
