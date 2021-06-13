const common = require('./webpack.common');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
const { resolve } = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const zlib = require('zlib');

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: '[name].bundle.js',
        path: resolve(__dirname, 'static-server', 'dist'),
        publicPath: '/',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CompressionPlugin({
            filename: '[path][base].br',
            algorithm: 'brotliCompress',
            test: /\.(js|css|html|svg)$/,
            minRatio: 0.8,
            threshold: 10240,
            compressionOptions: {
                [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
            },
        }),
        new CompressionPlugin({
            filename: '[path][base].gz',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8,
        }),
    ],
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
});
