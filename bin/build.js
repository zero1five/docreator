const fs = require('fs-extra')
const path = require('path')
const paths = require('./paths')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (sourcePath, options, config) => {
  process.env.BABEL_ENV = 'production'
  process.env.NODE_ENV = 'production'

  createBuildWorkder(config)
}

const createBuildWorkder = config => {
  const webpackConfig = require('./webpackBuildConfig')

  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      title: config.siteTitle,
      favicon: config.favicon
    })
  )

  const compiler = webpack(webpackConfig)
  compiler.run((err, stats) => {
    if (err) {
      throw err
    }
    copyPublicFolder(config)
  })
}

function copyPublicFolder(config) {
  fs.copy(
    path.resolve(config.sourcePath),
    path.resolve('dist', config.sourcePath),
    err => {
      if (err) throw err
    }
  )
}
