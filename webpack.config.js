const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",    //デプロイするときはproduction
    entry: path.resolve(__dirname, "./src/index.js"),   //dirnameは今存在している階層を指定している
    module: {
        rules: [
            {
                test:/\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,    //node_modulesは除外する
                use:[
                    {
                        loader: "babel-loader", //昔のブラウザでも対応させる
                    },
                ],
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    resolve: {
        extensions: [".js",".jsx", "ts", "tsx"],    //importした時のファイルの拡張子を入力しなくても済む
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname, "dist"),
        },
        port: 3000,
    },
};