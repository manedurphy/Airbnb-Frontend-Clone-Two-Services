const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { header, hostedby, headerNodeModules, hostedbyNodeModules } = require('./servicePaths');

module.exports = {
    entry: {
        header,
        hostedby,
    },
    module: {
        rules: [
            { test: /\.jsx$/, use: 'babel-loader', exclude: /node_modules/ },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.svg$/,
                use: 'file-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.jsx', '.js'],
        modules: [headerNodeModules, hostedbyNodeModules],
    },
    optimization: {
        splitChunks: {
            name: 'common',
            chunks: 'all',
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve(__dirname, 'Dane-Proxy', 'public', 'index.html'),
        }),
        new MiniCssExtractPlugin({ filename: 'style.css' }),
    ],
};
