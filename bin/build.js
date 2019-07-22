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
  const webpackConfig = require('./webpack.config.prod')

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
      console.error(err.stack || err)
      if (err.details) {
        console.error(err.details)
      }
      return
    }

    const info = stats.toJson()

    if (stats.hasErrors()) {
      console.error(info.errors)
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings)
    }

    copyPublicFolder(config)

    if (config.homePage === './README.md') {
      copyeReadmeMD(config)
    }
  })
}

function copyPublicFolder(config) {
  fs.copy(
    path.join(config.directoryPath, config.sourcePath),
    path.resolve('dist', config.sourcePath),
    err => {
      if (err) throw err
    }
  )
}

function copyeReadmeMD(config) {
  fs.copyFile(
    path.join(config.directoryPath, config.homePage),
    path.resolve('dist', config.homePage),
    err => {
      if (err) throw err
    }
  )
}
