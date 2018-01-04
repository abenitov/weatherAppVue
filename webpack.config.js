let path = require('path');
let webpack = require('webpack');
let copyWebpackPlugin = require('copy-webpack-plugin');


let outputPath = './build';
let outputFilename = 'app.js';
// Get the environment variable defined in the command (see package.json)
let env = process.env.WEBPACK_ENV;


let plugins = [];
// When compiling for production we want the app to be uglified.
if (env === 'production') {

    plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));

    // We also add it as a global, the Vue lib needs it to determine if Dev tool should be active or not.
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }));
    // Change file name extension to min.js
    fileName = outputFilename.replace(/js/g, 'min.js');
}

plugins.push( new copyWebpackPlugin([{
    from: 'src/public'
}]));


var config = {

    entry:{
        app: './src/app/app.js'
    },

    output: {
        path:  path.resolve(__dirname, outputPath),
        filename: outputFilename
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(scss|sass)$/,
                loader: ['style-loader', 'css-loader', 'sass-loader']
            },
        ]
    },

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
        }
    },

    plugins: plugins

    

};





module.exports = config;