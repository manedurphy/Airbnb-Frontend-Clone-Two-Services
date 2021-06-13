const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        hostedBy: path.resolve(__dirname, 'frontend', 'src', 'index.jsx'),
    },
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'frontend', 'dist'),
        filename: '[name].bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            { test: /\.jsx$/, use: 'babel-loader', exclude: /node_modules/ },
            {
                test: /\.js$/,
                enforce: 'pre',
                use: 'source-map-loader',
            },
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
    devServer: {
        contentBase: path.resolve(__dirname, 'frontend', 'dist'),
        compress: true,
        port: 3000,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://localhost:5002',
                secure: false,
                changeOrigin: true,
            },
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(
                __dirname,
                'frontend',
                'public',
                'index.html'
            ),
            title: 'Hosted By Service',
        }),
        new MiniCssExtractPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devtool: 'source-map',
};
