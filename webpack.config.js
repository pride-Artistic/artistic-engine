const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const OPTION_PRODUCTION = 'production', OPTION_DEVELOPMENT = 'development'

function getEngineEntryPoint(option = OPTION_DEVELOPMENT) {
    const base = {
        mode: option,
        context: __dirname,
        devtool: 'inline-source-map',
        output: {
            filename: '[name].js' ,
            path: path.join(__dirname, 'dist')
        },
        module: {
            rules: [{
                test: /(?<!\.test)\.ts$/,
                exclude: [
                    path.join(__dirname, 'node_modules')
                ],
                use: {
                    loader: 'ts-loader'
                }
            }]
        },
        resolve: {
            extensions: ['.js', '.ts']
        },
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
    
    if (option === OPTION_DEVELOPMENT) {
        base.entry = {
            artistic_engine_worker: './test-app/app_main.ts',
            main: './test-app/index.ts'
        }
        base.plugins = [
            new HtmlWebpackPlugin({
                template: "./src/index.html", 
            }),
        ]
    } else if (option === OPTION_PRODUCTION) {
        base.module.rules[0].exclude.push(path.join(__dirname, 'test-app'))
        base.entry = {
            engine: './src/index.ts',
            worker_resolver: './src/worker/index.ts'
        }
        base.output.library = {
            name: 'artistic-engine',
            type: 'commonjs2', // TODO: resolve appropriate type 
        }
    }
    return base
}

module.exports = getEngineEntryPoint(process.env.NODE_ENV)