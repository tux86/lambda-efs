const nodeExternals = require('webpack-node-externals')
const slsw = require('serverless-webpack')
const path = require('path')
const isLocal = slsw.lib.webpack.isLocal

module.exports = {
    context: __dirname,
    entry: slsw.lib.entries,
    target: 'node',
    mode: isLocal ? 'development' : 'production',
    devtool: isLocal ? 'eval-source-map' : 'source-map',
    externals: [nodeExternals()],
    optimization: {
        // important for database to avoid table name minification
        minimize: false,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: isLocal,
                    logLevel: isLocal ? 'info' : 'warn',
                },
                exclude: [
                    [
                        path.resolve(__dirname, 'node_modules'),
                        path.resolve(__dirname, '.serverless'),
                        path.resolve(__dirname, '.webpack'),
                        path.resolve(__dirname, 'dist'),
                    ],
                ],
            },
        ],
    },
    resolve: {
        symlinks: true,
        cacheWithContext: false,
        extensions: ['.mjs', '.json', '.ts'],
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js',
    },

}
