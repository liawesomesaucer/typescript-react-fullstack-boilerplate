# Fullstack TypeScript React-Redux + Express + Passport JWT Auth Boilerplate

A modern full-stack boilerplate with TypeScript React(16)+ Redux + React-Router, Express + Mongoose backend. It's a bit complicated but this is what I use.

* ES6 + linter, based mostly on Airbnb's [js guidelines](https://github.com/airbnb/javascript)
* Typescript
* Webpack + Prettier
* Authentication with JWT based on [this guide](https://medium.com/@rajaraodv/securing-react-redux-apps-with-jwt-tokens-fcfe81356ea0) (this demo includes a basic auth flow, feel free to remove)
* SCSS based on Airbnb's [SCSS](https://github.com/airbnb/css) guidelines + [Styled Components](https://www.styled-components.com/)
* Node Express backend featuring Mongo via Mongoose

## Other features/Things to keep in mind

Additional info about this configuration that you might want or want to reconfigure

* Axios is configured to automatically attach Auth JWT headers to API requests. Can be bypassed/modified by using `axios` normally or in your desired configuration
  * JWT tokens are stored in cookies (rather than localStorage)
* Redux is organized in the [Ducks Modular Redux](https://github.com/erikras/ducks-modular-redux) paradigm
* React containers are organized in the Ember-like fashion proposed by [alexmngn](https://medium.com/@alexmngn) in his [article](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1). A summary as follows:
  * Containers are placed as the `index.js` elements in their respective folders inside `scenes`. Each container can then have its own utilities, services, components and nested scenes, allowing grouping based on feature rather than by root page/element
  * General components (buttons, form elements) are placed in the general `client/components` directory
* Absolute imports are used - head to `webpack.config.dev.js` and look at `resolve.alias`. This allows you to import files from your project with paths like `Boilerplate/Components/FileName` rather than `../../../../Components/FileName`. Configure as you like.
* Forms use redux-form
* Note that in this simple Todo example, anyone can create or update todos as long as they are logged in

## First-time Setup

* Install [yarn](https://yarnpkg.com/en/docs/install)
* Install Webpack globally `yarn global add webpack`
* Install typescript globally `yarn global add typescript`
* Install mongo globally `yarn global add mongo`. In one terminal, run `sudo mongod` to spin up a database. Note the example .env is configured to connect to a database on localhost, but you can configure it as you like
* Inside the main directory of the project, run `yarn` to install dependencies

Go ahead and run
```bash
$ yarn start:dev
```

To start devving!

## Development

* `yarn start:dev` - to start local development server with nodemon and hot reloading.
* `yarn test` - to run unit tests.
* `yarn lint` - to run linter.
* `yarn build` - to build production files
* `yarn start:prod` - to start the server in production mode
* `yarn bs` - to build production files and start server in production mode (combination of above two steps).
