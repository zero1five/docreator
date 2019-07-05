const fs = require('fs')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const koa = require('koa')

const HOST = process.env.HOST || '0.0.0.0'

module.exports = (sourcePath, options, config) => {
  process.env.BABEL_ENV = 'development'
  process.env.NODE_ENV = 'development'

  createServer(config)
  createStaticServer(config)
}

const createServer = config => {
  const webpackConfig = require('./webpackConfig')
  const serverConfig = require('./webpackServerConfig')

  const compiler = webpack(webpackConfig)
  const devServer = new WebpackDevServer(compiler, serverConfig)

  devServer.listen(3000, HOST, err => {
    if (err) {
      return console.log(err)
    }
    console.log()
    console.log(`Docreator is running on port 3000`)
    console.log()
  })
}

const createStaticServer = config => {
  const app = new koa()

  app.use(async ctx => {
    ctx.set('Access-Control-Allow-Origin', '*')
    let content = await render(ctx.request.url)
    ctx.body = content
  })

  const port = config.staticServerPort || 3001
  app.listen(port)

  console.log()
  console.log(`[koa] static-server is starting at port ${port}`)
  console.log()
}

function render(page) {
  return new Promise((resolve, reject) => {
    let viewUrl = `.${page}`
    fs.readFile(viewUrl, 'binary', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}
