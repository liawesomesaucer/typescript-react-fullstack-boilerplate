const webpack = require('webpack');
const autoprefixer = require('autoprefixer/lib/autoprefixer');
const path = require('path');

module.exports = {
  devtool: 'source-map',
  mode: 'production',

  entry: {
    app: [
      './client/index.tsx',
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
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.(ts|tsx)$/,
        loader: "ts-loader",
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
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
        loader: ('style-loader!css-loader'),
      },
      {
        test: /\.svg$/,
        loader: 'babel!svg-react',
      },
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
  ],
};
