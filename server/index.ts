import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import passport from './config/passport';

const config = require('../webpack.config.dev');
const prodConfig = require('../webpack.config.prod');

dotenv.load()

// From .env
import envConfig from './config/config';

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(logger('short'));
} else {
  app.use(logger('dev'));

  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

// Enable CORS from client-side
// TODO: secure this for production
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials", "true');
  next();
});

// Database
mongoose.connect(envConfig.database, {
  useMongoClient: true,
  // TODO: remove this for production
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 5000,
});

// Express config
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Passport
app.use(passport.initialize());

app.disable('x-powered-by');
app.enable('trust proxy');

// To make browserHistory work for ReactJS
app.get(/^((?!api).)*$/, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

// Add routes from controllers
import router from './router';

router(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});

module.exports = app;
