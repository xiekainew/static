const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const htmlPlugin = new HtmlWebpackPlugin({
	template: path.resolve(__dirname, './src/index.html'),
	filename: 'index.html'
})
module.exports = {
	mode: 'development',
	module: {
		rules: [{
			test: /\.js|jsx$/,
			use: 'babel-loader',
			exclude: /node_modules/
		}, {
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		}, {
			test: /\.ttf|woff|woff2|eot|svg$/,
			use: 'url-loader'
		}, {
			test: /\.scss$/,
			use: ['style-loader', 'css-loader', 'sass-loader']
			// use: ['style-loader', 'css-loader?modules', 'sass-loader']
		}]
	},
	plugins: [
		htmlPlugin
	],
	resolve: {
		extensions: ['.js', '.jsx', '.json'],
		alias: {
			'@': path.join(__dirname, './src')
		}
	}
}