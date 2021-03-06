/**
 * Created by kib357 on 30/10/15.
 */

var webpack = require("webpack");
var path = require("path");

console.log("Loading webpack config...");
module.exports = {
    entry: ["whatwg-fetch", "./src/js/app.js"],
    output: {
        path: "./release",
        filename: "bundle.js",
        publicPath: "/blank/js/",
    },
    resolve: {
        root: [
            path.resolve("./blank-js-core"),
            path.resolve("./src/lib"),
        ],
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader", // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ["react", "es2015"],
                },
            },
            { test: require.resolve("react"), loader: "expose?React" },
            { test: require.resolve("react-dom"), loader: "expose?ReactDOM" },
        ],
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en|ru)$/),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: false,
            //mangle: false,
            output: {
                comments: false,
            },
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production"),
            },
        }),
    ],
};