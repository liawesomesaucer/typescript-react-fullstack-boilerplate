const webpack = require('webpack');
const autoprefixer = require('autoprefixer/lib/autoprefixer');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const path = require('path');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',

  entry: {
    app: [
      'eventsource-polyfill',
      'webpack-hot-middleware/client',
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      './client/index.tsx',
    ],
    vendor: [
      'react',
      'react-dom',
    ],
  },

  output: {
    path: __dirname,
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: 'app.js',
    // This is the URL that app is served from. We use "/" in development.
    publicPath: '/',
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    /**
     * This sets an alias so that instead of importing like:
     *    import Button from '../../../Components/Button';
     *
     * You can import like so:
     *    import Button from 'Boilerplate/Components/Button';
     *
     * Feel free to configure the name as you like
     */
    alias: {
      Boilerplate: path.resolve(__dirname, 'client'),
    }
  },

  module: {
    rules: [
      // Preloaders

      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      {
        test: /\.(ts|tsx)$/,
        loader: 'tslint-loader',
        enforce: 'pre',
        include: [
          __dirname + '/client',
          __dirname + '/server'
        ]
      },

      // Loaders
      {
        test: /\.(t|j)sx?$/,
        use: {
          loader: 'awesome-typescript-loader'
        },
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer
              ]
            }
          },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.svg$/,
        loader: 'babel-loader!svg-react-loader',
      }
    ],
  },

  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.js',
    }
  },

  plugins: [
    // This is necessary to emit hot updates (currently CSS only)
    new webpack.HotModuleReplacementPlugin(),
    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    new CaseSensitivePathsPlugin(),
    // If you require a missing module and then `npm install` it, you still have
    // to restart the development server for Webpack to discover it. This plugin
    // makes the discovery automatic so you don't have to restart.
    new WatchMissingNodeModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        CLIENT: JSON.stringify(true),
        'NODE_ENV': JSON.stringify('development'),
      }
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        // context: __dirname,
        eslint: {
          configFile: path.join(__dirname, './.eslintrc'),
          useEslintrc: false,
        },
      }
    }),
  ],

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  devtool: "source-map"
};
