const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const HOST = process.env.HOST || '0.0.0.0'

module.exports = (sourcePath, options) => {
  process.env.BABEL_ENV = 'development'
  process.env.NODE_ENV = 'development'

  createServer()
}

const createServer = () => {
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
