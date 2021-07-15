const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const header = resolve(__dirname, 'photo-header', 'frontend', 'src', 'index.jsx');
const headerNodeModules = resolve(__dirname, 'photo-header', 'node_modules');
const hostedby = resolve(__dirname, 'hosted-by', 'frontend', 'src', 'index.jsx');
const hostedbyNodeModules = resolve(__dirname, 'hosted-by', 'node_modules');

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
                loader: 'file-loader',
                options: {
                    publicPath: '/apps/airbnb-clone/',
                },
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
            template: resolve(__dirname, 'static-server', 'public', 'index.html'),
        }),
        new MiniCssExtractPlugin({ filename: 'style.css' }),
    ],
};
