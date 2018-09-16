import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.SFC = () => {
  return (
    <div className="stretch">
      <h1>Hello</h1>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
}

export default Home;
