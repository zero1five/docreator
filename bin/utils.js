const fs = require('fs')
const path = require('path')
const [mode, sourcePath, ...options] = process.argv.slice(2)

const appDirectory = fs.realpathSync(process.cwd())

const resolveApp = relativePath =>
  path.resolve(appDirectory, sourcePath, relativePath)

const insertStr = (soure, start, newStr) => {
  return soure.slice(0, start) + newStr + soure.slice(start)
}

module.exports = { appDirectory, resolveApp, insertStr }
