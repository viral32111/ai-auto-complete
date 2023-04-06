const path = require( "path" )
const MiniCssExtractPlugin = require( "mini-css-extract-plugin" )

module.exports = {
	entry: [
		"./source/browser/scripts/index.ts",
		"./source/browser/styles/index.scss"
	],
	mode: "development",
	devtool: "inline-source-map",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				include: [
					path.resolve( __dirname, "source/browser/scripts" )
				]
			},
			{
				test: /\.css$/i,
				use: [ MiniCssExtractPlugin.loader, "css-loader" ]
			},
			{
				test: /\.s[ac]ss$/i,
				use: [ MiniCssExtractPlugin.loader, "css-loader", "sass-loader" ],
				include: [
					path.resolve( __dirname, "source/browser/styles" )
				]
			},
		]
	},
	plugins: [
		new MiniCssExtractPlugin( {
			filename: "styles/bundle.dev.css",
			chunkFilename: "styles/bundle.[name].dev.css"
		} )
	],
	output: {
		filename: "scripts/bundle.dev.js",
		path: path.resolve( __dirname, "browser/" )
	}
}
