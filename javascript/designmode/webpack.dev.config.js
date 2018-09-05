const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry:'./src/index.js',
    output:{
        path:__dirname,
        filename:'./release/bundle1.js'
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./index.html'
        })
    ],
    devServer:{
        contentBase:path.join(__dirname,'./release'),
        open:true,
        port:8000,
        proxy:{
            '/api/*':{
                target:'http://localhost:8880'
            }
        }
    },
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader'
        }]
    }
}