const fs = require('fs')
const paths = require('./paths')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const openBrowser = require('react-dev-utils/openBrowser')
const { prepareUrls } = require('react-dev-utils/WebpackDevServerUtils')
const koa = require('koa')

const HOST = process.env.HOST || '0.0.0.0'

module.exports = (sourcePath, options, config) => {
  process.env.BABEL_ENV = 'development'
  process.env.NODE_ENV = 'development'

  createServer(config)
  createStaticServer(config)
}

const createServer = config => {
  const webpackConfig = require('./webpack.config.dev')
  const serverConfig = require('./webpackServerConfig')

  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      title: config.siteTitle,
      favicon: config.favicon
    })
  )

  const compiler = webpack(webpackConfig)
  const devServer = new WebpackDevServer(compiler, serverConfig)

  devServer.listen(3000, HOST, err => {
    if (err) {
      return console.log(err)
    }
    console.log()
    console.log(`Docreator is running on port 3000`)
    console.log()

    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http'
    const urls = prepareUrls(protocol, HOST, 3000)
    openBrowser(urls.localUrlForBrowser)
  })
}

const createStaticServer = config => {
  const app = new koa()

  app.use(async ctx => {
    ctx.set('Access-Control-Allow-Origin', '*')
    let content = await hydrate(ctx.request.url, config.directoryPath)
    ctx.body = content
  })

  const port = config.staticServerPort || 3001
  app.listen(port)

  console.log()
  console.log(`[koa] static-server is starting at port ${port}`)
  console.log()
}

function hydrate(page, path) {
  return new Promise((resolve, reject) => {
    let viewUrl = `${path}${decodeURIComponent(page)}`
    fs.readFile(viewUrl, 'binary', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}
