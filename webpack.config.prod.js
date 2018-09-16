const webpack = require('webpack');
const autoprefixer = require('autoprefixer/lib/autoprefixer');
const path = require('path');

module.exports = {
  devtool: 'cheap-module-source-map',

  entry: {
    app: [
      './client/index.ts',
    ],
    vendor: [
      'react',
      'react-dom',
    ],
  },

  output: {
    path: __dirname + '/public/',
    filename: '[name].js',
    publicPath: '/',
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    alias: {
      Boilerplate: path.resolve(__dirname, 'client'),
    }
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.scss$/,
        loader: ('style-loader!css-loader!sass-loader'),
      },
      {
        test: /\.css$/,
        loader: ('style-loader!css-loader'),
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.svg$/,
        loader: 'babel!svg-react',
      },
    ],
  },

  postcss: () => [
    autoprefixer({
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9',
      ],
    }),
  ],

  plugins: [
  ],
};
