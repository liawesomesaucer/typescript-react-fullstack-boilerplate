import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";

// Component imports
import Navigation from "./scenes/Navigation";

import LoginPage from "./scenes/Auth/scenes/Login";
import RegisterPage from "./scenes/Auth/scenes/Register";
import RequireAuth from "./scenes/Auth/services/RequireAuth";

import NotFound from "./components/NotFound";

import Todo from "./scenes/Todo";
import Todos from "./scenes/Todos";

import Home from "./scenes/Home";

import "./styles/styles.scss";

interface AppProps {
  history: any;
  location: any;
  match: any;
}

const App: React.SFC<AppProps> = () => (
  <div>
    <Navigation />
    <Switch>
      <Route exact path="/" component={Home} />

      <Route exact path="/todos" component={Todos} />

      {/* Pages requiring a user to be logged in can be wrapped as such */}
      <Route exact path="/todos/:todoId" component={RequireAuth(Todo)} />

      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />

      <Route component={NotFound} />
    </Switch>
  </div>
);

function mapStateToProps(state: any) {
  return {
    auth: state.auth,
    location: state.router.location
  };
}

export default connect(mapStateToProps)(withRouter(App));
