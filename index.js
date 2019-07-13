const fs = require('fs-extra')
const path = require('path')
const paths = require('./bin/paths')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpackBuildConfig = {
  entry: './test.js', // 入口文件
  output: {
    filename: 'bundle.js', // 打包后的文件名称
    path: path.resolve('dist') // 打包后的目录，必须是绝对路径
  },
  plugins: []
}

const createBuildWorkder = config => {
  webpackBuildConfig.plugins.push(
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      title: config.siteTitle,
      favicon: config.favicon
    })
  )

  const compiler = webpack(webpackBuildConfig)
  compiler.run((err, stats) => {
    if (err) {
      throw err
    }
    console.log(stats)
  })
}

createBuildWorkder({})
