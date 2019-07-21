const fs = require('fs')
const paths = require('./paths')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const openBrowser = require('react-dev-utils/openBrowser')
const {
  choosePort,
  prepareUrls
} = require('react-dev-utils/WebpackDevServerUtils')
const koa = require('koa')

const HOST = process.env.HOST || '0.0.0.0'
const DEFAULT_PORT = 3000

module.exports = (sourcePath, options, config) => {
  process.env.BABEL_ENV = 'development'
  process.env.NODE_ENV = 'development'

  createServer(config)
}

const createServer = config => {
  choosePort(HOST, DEFAULT_PORT)
    .then(port => {
      if (port === null) {
        throw Error('failed create webpack server')
      }
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

      devServer.listen(port, HOST, err => {
        if (err) {
          return console.log(err)
        }
        console.log()
        console.log(`Docreator is running on port ${port}`)
        console.log()

        const protocol = process.env.HTTPS === 'true' ? 'https' : 'http'
        const urls = prepareUrls(protocol, HOST, port)

        createStaticServer(config, ++port)
        openBrowser(urls.localUrlForBrowser)
      })
    })
    .catch(err => {
      if (err && err.message) {
        console.log(err.message)
      }
      process.exit(1)
    })
}

const createStaticServer = (config, staticServerPort) => {
  const app = new koa()

  app.use(async ctx => {
    ctx.set('Access-Control-Allow-Origin', '*')
    let content = await hydrate(ctx.request.url, config.directoryPath)
    ctx.body = content
  })

  const port = staticServerPort
  config.staticServerPort = staticServerPort
  app.listen(port)

  console.log()
  console.log(`[koa] static-server is starting at port ${port}`)
  console.log()
}

function hydrate(page, path) {
  return new Promise((resolve, reject) => {
    let viewUrl = `${path}${decodeURIComponent(page)}`
    fs.readFile(viewUrl, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}
