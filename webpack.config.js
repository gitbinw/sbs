var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: [
		'webpack-dev-server/client?http://localhost:8081',
		'webpack/hot/only-dev-server',
		//'whatwg-fetch',
		'./src/index.js'
	],
	devtool: "source-map",
	module: {
		rules: [{
		  test: /\.jsx?$/,
		  exclude: /node_modules/,
		  loader: 'react-hot-loader!babel-loader'
		}, {
		  test: /\.scss$/,
		  use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
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
	}/*,
	plugins: [
       new webpack.optimize.UglifyJsPlugin({minimize: true})
   ]*/
};