const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const options = {}


 options['development'] = {
    mode: 'development',
    context: __dirname,
    entry: './src/main.ts',
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
                loader: 'ts-loader'
            }
        }]
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./dist/index.html", 
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        hot: false, // optional, but you must not set both hot and liveReload to true
        liveReload: true,
        compress: true,
        port: 8010
    }
}


options['production'] = {
    mode: 'production',
    context: __dirname,
    entry: './src/main.ts',
    devtool: 'inline-source-map',
    output: {
        filename: 'main.js' ,
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            use: {
                loader: 'ts-loader'
            }
        }]
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./dist/index.html", 
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        inline: true,
        hot: false, // optional, but you must not set both hot and liveReload to true
        liveReload: true,
        compress: true,
        port: 8010
    }
}


module.exports = options['development']