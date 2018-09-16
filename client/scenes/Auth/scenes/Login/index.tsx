import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm, InjectedFormProps } from "redux-form";

import { loginUser, LoginInfo } from "Boilerplate/modules/auth";

const form = reduxForm({
  form: "login"
});

interface LoginProps {
  errorMessage: string;
  loginUser: (_: LoginInfo) => any;
}

const Login: React.SFC<LoginProps & InjectedFormProps> = () => {
  return (
    <div className="auth__wrapper">
      <div className="auth__background" />
      <div className="auth">
        <h3>Login to Boilerplate</h3>
        <form onSubmit={(e) => this.props.loginUser(e)}>
          {this.props.errorMessage &&
            <div>
              <span>
                <strong>Error!</strong>
                {this.props.errorMessage}
              </span>
            </div>
          }
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
          <button type="submit" className="btn btn-primary">
            Login
            </button>
        </form>
      </div>
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
