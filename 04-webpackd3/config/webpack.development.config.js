const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
            exclude: /node_modules/,
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
	watch: true,
	plugins: [
	  new HtmlWebpackPlugin({
      template: 'index.html'
    }),
		new webpack.HotModuleReplacementPlugin(),
	],
	devServer: {
	  contentBase: path.join(__dirname, '../dist'),
		open: true,
		inline: true,
		hot: true,
		historyApiFallback: true
	}
};
