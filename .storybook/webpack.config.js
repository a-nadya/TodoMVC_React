const path = require("path");

module.exports = ({ config }) => {
    config.module.rules.push(
        {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            loader: "ts-loader",
        },
        {
            test: /\.(css|less)$/,
            use: [
                "style-loader",
                {
                    loader: "css-loader",
                    options: {
                        modules: {
                            localIdentName: "[local]___[hash:base64:4]",
                        },
                        sourceMap: true,
                    },
                },
                "less-loader"
            ],
            include: [
                path.join(__dirname, "..", "src"),
                path.join(__dirname, "..", "stories"),
            ],

        }
    );
    config.resolve.extensions = [
        ...config.resolve.extensions,
        ".ts",
        ".tsx",
        ".js",
    ];
    return config;
};
