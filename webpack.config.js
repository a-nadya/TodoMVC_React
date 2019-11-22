const path = require('path');
const bundlePath = path.resolve(__dirname, 'build');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: bundlePath,
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: "ts-loader"
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './resources/index.html',
        })
    ]
};
