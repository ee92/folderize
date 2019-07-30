const path = require('path');

const config = {
	mode: 'production',
	target: 'node',
	entry: './extension.ts',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'folderize.js',
		libraryTarget: 'commonjs2',
	},
	externals: {
		vscode: 'commonjs vscode'
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader'
					}
				]
			}
		]
	}
};

module.exports = config;