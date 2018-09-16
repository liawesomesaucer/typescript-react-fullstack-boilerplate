import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm, InjectedFormProps } from "redux-form";

import { registerUser, RegisterInfo } from "Boilerplate/modules/auth";

const renderField = (field: any) => (
  <div>
    <input className="form-control" {...field.input} />
    {field.touched && field.error && <div className="error">{field.error}</div>}
  </div>
);

const renderPasswordField = (field: any) => (
  <div>
    <input className="form-control" type="password" {...field.input} />
    {field.touched && field.error && <div className="error">{field.error}</div>}
  </div>
);

function validate(formProps: RegisterInfo) {
  const errors: any = {};

  if (!formProps.username) {
    errors.username = "Please enter a username";
  }

  if (!formProps.email) {
    errors.email = "Please enter an email";
  }

  if (!formProps.password) {
    errors.password = "Please enter a password";
  }

  return errors;
}

const form = reduxForm({
  form: "register",
  validate
});

interface RegisterPageProps {
  registerUser: (_: RegisterInfo) => any;
  handleSubmit: (_: any) => any;
  errorMessage: string;
}

class RegisterPage extends React.Component<RegisterPageProps & InjectedFormProps, {}> {
  handleFormSubmit(formProps: RegisterInfo) {
    this.props.registerUser(formProps);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="auth__wrapper">
        <div className="auth__background" />
        <div className="auth">
          <h3>Register for Boilerplate</h3>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            {this.props.errorMessage &&
              <div>
                <span>
                  <strong>Error!</strong> {this.props.errorMessage}
                </span>
              </div>
            }
            <div className="row">
              <div className="col-md-12">
                <label htmlFor="sb-auth--form-username">Username</label>
                <Field
                  id="sb-auth--form-username"
                  name="username"
                  className="form-control"
                  component={renderField}
                  type="text"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <label htmlFor="sb-auth--form-email">Email</label>
                <Field
                  id="sb-auth--form-email"
                  name="email"
                  className="form-control"
                  component={renderField}
                  type="text"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <label htmlFor="sb-auth--form-password">Password</label>
                <Field
                  id="sb-auth--form-password"
                  name="password"
                  className="form-control"
                  component={renderPasswordField}
                  type="password"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }
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
)(form(RegisterPage));