const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname, '../src'),
  entry: './app.js',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'app.js',
  },
	module: {
    rules: [
      { 
        test: /\.hbs$/,
        loader: "handlebars-loader"
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
		loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: 'json-loader'
      }
    ]
  },
	plugins: [ 
		new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
	]
};
