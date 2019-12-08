const path = require('path');

module.exports = ({config}) => {
    config.module.rules.push(
        {
            test: /\.(ts|tsx)$/,
            include: [
                path.join(__dirname, "..", "src"),
                path.join(__dirname, "..", "stories")
            ],
            loader: "ts-loader"
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
        }
    );
    config.resolve.extensions.push (".ts", ".tsx");

    return config;
};
