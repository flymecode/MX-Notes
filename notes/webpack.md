```js
const path = require('path')
// 启动热更新的
const webpack = require('webpack')
// 导入安装
// 只要是插件就放入plugins节点中
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: path.join(__dirname, './src/main.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    // 配置dev-Server
    devServer: {
        open: true,
        port: 3000,
        contentBase: 'src',
        hot: true
    },
    plugins: [
        // 配置插件的节点
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({ // 创建一个在内存中生成html
            // 生成内存中的页面
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html'
        })
    ],
    module: {
        rules : [
            {test: /\.css$/,use:['style-loader','css-loader']},
            {test: /\.less$/,use:['style-loader','css-loader','less-loader']},
            {test: /\.scss$/,use:['style-loader','css-loader','less-loader']},
        ]
    }
}
```