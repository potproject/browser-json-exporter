const webpack = require("webpack");
module.exports = {
    entry: {
        "browserjsonexporter": __dirname + "/src/browserjsonexporter.es6",
        "browserjsonexporter.min": __dirname + "/src/browserjsonexporter.es6",
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
          })
    ],
    module: {
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015'],
                plugins: ['add-module-exports']
            }
        }]
    }
};