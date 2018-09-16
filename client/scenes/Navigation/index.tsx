import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

import * as authActions from '../../modules/auth';

const cookies = new Cookies();

interface NavigationProps {
  user: any;
  authenticated: boolean;
  logoutUser:() => void;
  unauthUser:() => void;
  authUser:(user: any) => void;
};

/**
 * Navigation bar. Should handle links in site. Should show
 * different content based on if user is logged in or not
 */
class Navigation extends React.Component<NavigationProps, {}> {
  constructor(props: NavigationProps) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    // If redux says logged in, send request
    axios.get('/api/me', {
      headers: { Authorization: cookies.get('token') },
    })
      .then((res) => {
        this.setState({ user: res.data.user });
        this.props.authUser(res.data.user);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          this.props.unauthUser();
        }
      });
  }

  handleLogout() {
    this.props.logoutUser();
  }

  render() {
    const { user, authenticated } = this.props;

    return (
      <div className="navbar nav">
        {authenticated &&
          <p>Hi {user.username}, you are authenticated</p>
        }
        <Link to="/">Home</Link>
        <Link to="/todos">Todos</Link>
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    authenticated: state.auth.authenticated,
    user: state.auth.user,
  };
}

export default connect(mapStateToProps, authActions)(Navigation);
