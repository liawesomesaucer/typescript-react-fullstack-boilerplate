import React from 'react';

const Home: React.SFC = () => {
  return (
    <div className="container">
      <h1>TypeScript React FullStack Boilerplate</h1>
      <a
        href="https://github.com/liawesomesaucer/typescript-react-fullstack-boilerplate"
        target="_blank"
      >
        Documentation
      </a>
      <h2>A Todo List Boilerplate With:</h2>
      <ul>
        <li>Typescript</li>
        <li>React</li>
        <li>Redux (via the Ducks Modular Redux paradigm) + Redux-Form</li>
        <li>Express Server with Mongo via Mongoose</li>
        <li>JWT Authentication</li>
        <li>SCSS</li>
        <li>Linting configured for SCSS and Typescript</li>
        <li>Works with a Mongo database out of the box</li>
      </ul>
      <p>
        Read the&nbsp;
        <a
          href="https://github.com/liawesomesaucer/typescript-react-fullstack-boilerplate"
          target="_blank"
        >
          Docs
        </a>
      </p>
    </div>
  );
}

export default Home;
