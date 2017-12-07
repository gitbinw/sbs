var path = require('path');
var webpack = require('webpack');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "main.css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
	entry: [
		//'webpack-dev-server/client?http://localhost:8080',
		//'webpack/hot/only-dev-server',
		//'whatwg-fetch',
		'./src/index.js'
	],
	module: {
		rules: [{
		  test: /\.jsx?$/,
		  exclude: /node_modules/,
		  loader: 'react-hot-loader!babel-loader'
		}, {
		  test: /\.scss$/,
		  use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
        	})
		}]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx']
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	devServer: {
		contentBase: './dist',
		hot: true
	},
	plugins: [
       new webpack.optimize.UglifyJsPlugin({minimize: true}),
	   extractSass
   ]
};