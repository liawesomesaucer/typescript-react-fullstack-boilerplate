import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as compression from 'compression';
import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

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

// Sessions needed for users
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

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
