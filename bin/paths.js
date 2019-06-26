const fs = require('fs')
const path = require('path')

const appDirectory = fs.realpathSync(path.resolve(__dirname, '../'))
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {
  appIndexJs: resolveApp('src/index.js'),
  appHtml: resolveApp('public/index.html'),
  appPublic: resolveApp('public'),
  appSrc: resolveApp('src'),
  appRoot: resolveApp('')
}
