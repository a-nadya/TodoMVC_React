const path = require('path');
const bundlePath = path.resolve(__dirname, 'build');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
    const IS_DEV = argv.mode !== 'production';
    
    return {

        entry: './src/index.tsx',
        output: {
            filename: IS_DEV ? 'bundle.js' : 'bundle___[hash].js',
            path: bundlePath,
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"]
        },

        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    include: /src/,
                    loader: "ts-loader"
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"]
                },
                {
                    test: /\.(less)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                modules: {
                                    localIdentName: IS_DEV ? '[local]___[hash:base64:4]' : '[hash:base64:4]'
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
                filename: IS_DEV ? 'main.css' : 'main___[hash].css',
            }),
            new HtmlWebpackPlugin({
                template: './resources/index.html',
            })
        ]
    }
};
