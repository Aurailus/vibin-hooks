import { resolve } from 'path';

const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');

export default function() {
	return {
		name: 'test',

		mode: 'development',
		devtool: 'source-map',
		stats: 'minimal',

		context: resolve(__dirname),
		entry: { main: './src/test/Main.tsx' },
		output: { path: resolve(__dirname, 'build') },
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.jsx'],
		},

		plugins: [
			new ForkTsCheckerPlugin({
				typescript: { configFile: resolve(__dirname, 'tsconfig.json') },
				// eslint: {
				// 	files: './**/*.{ts,tsx,js,jsx}',
				// 	options: {
				// 		configFile: resolve(__dirname, '.eslintrc.json'),
				// 		emitErrors: true,
				// 		failOnHint: true,
				// 		typeCheck: true,
				// 	},
				// },
			}),
		],

		module: {
			rules: [
				{
					test: /\.[t|j]sx?$/,
					loader: 'babel-loader',
					options: {
						babelrc: false,
						cacheDirectory: true,
						presets: [
							[
								'@babel/preset-typescript',
								{
									isTSX: true,
									allExtensions: true,
									jsxPragma: 'createElement',
								},
							],
							[
								'@babel/preset-env',
								{
									targets: { browsers: ['Chrome 78'] },
								},
							],
						],
						plugins: [
							[
								'@babel/transform-react-jsx',
								{
									pragma: 'createElement',
								},
							],
							['@babel/plugin-transform-class-properties'],
						],
					},
				},
			],
		}
	};
}
