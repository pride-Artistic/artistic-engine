const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const OPTION_PRODUCTION = 'production', OPTION_DEVELOPMENT = 'development'

const options = {}

options[OPTION_DEVELOPMENT] = {
    mode: OPTION_DEVELOPMENT,
    context: __dirname,
    entry: './test-app/index.ts',
    devtool: 'inline-source-map',
    output: {
        filename: 'main.js' ,
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: [
                /node_modules/,
                /test\.ts$/,
            ],
            use: {
                loader: 'ts-loader',
                options: {
                    configFile: 'tsconfig.test.json'
                },
            }
        }]
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html", 
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        hot: false, // optional, but you must not set both hot and liveReload to true
        liveReload: true,
        compress: true,
        port: 8010,
        https: true
    }
}

options[OPTION_PRODUCTION] = {
    mode: OPTION_PRODUCTION,
    context: __dirname,
    experiments: {
        outputModule: true
    },
    entry: { 
        main: './src/index.ts',
        event: './src/event/index.ts',
        modifiers: './src/modifiers/index.ts',
        loader: './src/loader/index.ts',
        sprite: './src/sprite/index.ts',
    },
    devtool: 'inline-source-map',
    output: {
        filename: '[name].js' ,
        path: path.join(__dirname, 'dist'),
        library: {
            type: 'module',
//            name: "[name]"
        }
    },
    module: {
        rules: [{
            test: /(?<!\.test)\.ts$/,
            exclude: [
                path.join(__dirname, 'node_modules'), 
                path.join(__dirname, 'test-app'), 
                path.join(__dirname, 'test')
            ],
            use: {
                loader: 'ts-loader',
                options: {
                    configFile: 'tsconfig.prod.json'
                },
            }
        }]
    },
    resolve: {
        extensions: ['.js', '.ts']
    }
}

module.exports = options[process.env.NODE_ENV === OPTION_PRODUCTION ? OPTION_PRODUCTION : OPTION_DEVELOPMENT]