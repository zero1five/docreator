const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware')
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware')
const paths = require('./paths')
const config = require('./webpack.config.dev')

module.exports = {
  disableHostCheck: true,
  compress: true,
  clientLogLevel: 'none',
  hot: true,
  quiet: true,
  headers: {
    'access-control-allow-origin': '*'
  },
  publicPath: config.output.publicPath,
  watchOptions: {
    ignored: [/node_modules/, `!${paths.appSrc}/**`]
  },
  historyApiFallback: {
    disableDotRule: true
  },
  overlay: false,
  contentBase: paths.appPublic,
  before: (app, server) => {
    app.use(errorOverlayMiddleware())
    app.use(noopServiceWorkerMiddleware())
  }
}
