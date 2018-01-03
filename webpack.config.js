module.exports = {

	entry: './src/app.js',
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'babel-preset-stage-2']
				}
			},
			{
				test: /\.scss$/,
				loader: 'style-loader!css-loader!sass-loader'
			},
			{
		        test: /\.(jpg|jpeg|png)$/i,
		        loader: 'file-loader'
		    }
		]
	}
}