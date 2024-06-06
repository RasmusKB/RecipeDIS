// Modules
const Path = require('path')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const TARGET = process.env.NODE_ENV
const settings = require('./settings')

// Define paths
const PATHS = {
    src: Path.resolve(__dirname, '../src'),
    public: Path.resolve(__dirname, '../public'),
    build: Path.resolve(__dirname, '../build'),
    modules: Path.resolve(__dirname, '../node_modules'),
    root: Path.resolve(__dirname, '..')
}

const common = {
    entry: [Path.resolve(PATHS.src, 'index.js')],

    output: {
        path: PATHS.build,
        publicPath: settings.build.publicPath,
        filename: `${settings.build.mainBundleName}.bundle.[chunkhash].js`,
        chunkFilename: '[name].bundle.[chunkhash].js'
    },

    target: 'web',

    resolve: {
        modules: [PATHS.modules],
        extensions: ['.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: Path.resolve(PATHS.public, 'index.ejs'),
            htmlTheme: settings.html.theme,
            title: settings.html.title
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: `${PATHS.public}`,
                globOptions: {
                    ignore: ['index.ejs']
                }
            }]
        })
    ]
}

// When in development mode
if (TARGET === 'development' || !TARGET) {
    module.exports = merge(common, {
        devtool: 'cheap-module-source-map',

        mode: 'development',

        devServer: {
            static: {
                directory: PATHS.build
            },
            port: 3000,
            historyApiFallback: true,
            hot: true,
            proxy: [
                {
                    context: settings.proxy.paths,
                    target: `http://localhost:${settings.proxy.port}`
                },
            ]
        },

        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    include: [PATHS.src],
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: [
                                ['@babel/env', {
                                    targets: {
                                        browsers: settings.build.supportedBrowsers
                                    }
                                }],
                                '@babel/preset-react'
                            ],
                            plugins: [
                                'react-refresh/babel'
                            ]
                        }
                    }]
                }
            ]
        },

        plugins: [
            new ReactRefreshWebpackPlugin()
        ]
    })
}
