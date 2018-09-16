import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';

interface AuthenticationProps {
  history: any,
  authenticated?: boolean,
};

/**
 * Higher order component that requires authentication and redirects the user to the
 * login screen
 * @param {*} ComposedComponent - The component input
 */
export default function (ComposedComponent: any) {
  class Authentication extends React.Component<AuthenticationProps & RouteComponentProps, {}> {
    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/login');
      }
    }

    componentWillUpdate(nextProps: AuthenticationProps) {
      if (!nextProps.authenticated) {
        this.props.history.push('/login');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state: any) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(withRouter(Authentication));
}
