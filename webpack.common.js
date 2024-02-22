const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const BASE_URL = '.';

module.exports = {
  entry: ['focus-visible', './src/index.jsx'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  resolve: {
    alias: {
      static: path.resolve(__dirname, 'static/'),
      components: path.resolve(__dirname, 'src/components/'),
      util: path.resolve(__dirname, 'src/util/'),
      style: path.resolve(__dirname, 'src/style/'),
    },
    extensions: ['.wasm', '.mjs', '.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react'],
          },
        },
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      templateParameters: {
        title: 'Password Generator',
        description: 'A highly configurable tool for generating cryptographically secure random passwords inside your browser.',
        openGraphImageUrl: `${BASE_URL}/static/og.jpg`,
		FaviconICO: `${BASE_URL}/favicon/favicon.ico`,
		FaviconSVG: `${BASE_URL}/favicon/favicon.svg`,
		Favicon16: `${BASE_URL}/favicon/favicon-16x16.png`,
		Favicon32: `${BASE_URL}/favicon/favicon-32x32.png`,
		Favicon196: `${BASE_URL}/favicon/favicon-196x196.png`,
      },
      minify: {
        collapseWhitespace: true,
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'static/*.jpg', to: './' },
      ],
    }),
	new CopyWebpackPlugin({
      patterns: [
        { from: 'favicon/*', to: './' },
      ],
    }),
  ],
};
