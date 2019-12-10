const path = require('path');
const bundlePath = path.resolve(__dirname, 'build');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
    const isDev = argv != undefined && argv.mode !== 'production';
    // hot reload
    return {
        entry: './src/index.tsx',
        output: {
            filename: isDev ? 'bundle.js' : 'bundle___[hash].js',
            path: bundlePath,
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"]
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    include: path.resolve(__dirname, "src"),
                    loader: "ts-loader"
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"]
                },
                {
                    test: /\.(less)$/,
                    use: [
                        "classnames-loader",
                        isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                modules: {
                                    localIdentName: isDev ? '[local]-[hash:base64:2]' : '[hash:base64:5]'
                                }
                            }
                        },
                        'less-loader',
                    ],
                },
            ]
        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: isDev ? 'main.css' : 'main___[hash].css',
            }),
            new HtmlWebpackPlugin({
                template: './resources/index.html',
            })
        ]
    }
};
