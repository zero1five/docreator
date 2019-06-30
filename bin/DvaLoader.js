const path = require('path')
var fs = require('fs')
const chalk = require('chalk')
const produceNamespace = filename => {
  return filename.replace(/\.[j|t]s(x?)/, '')
}

const wrapperModel = (source, key, filename) => {
  return `Dva.model(require("${source + filename}"),"${filename}");\n`
}

const wrapperLayout = (source, key, filename) => {
  const namespace = produceNamespace(filename)
  return `Dva.routingComponent["${namespace}"]=require("${source +
    filename}").default;\n`
}

const CodeMerge = (path, wrapper) => {
  let src
  const dirs = fs.readdirSync(path)

  if (dirs.length === 1) {
    src = wrapper(path, dirs[0], dirs[0])
    return src
  }

  src = dirs.reduce(function(pre, next, index) {
    const prePath = path + pre
    const nextPath = path + next
    const key = dirs[index]

    if (index === 1) {
      return wrapper(prePath, dirs[0], pre) + wrapper(nextPath, key, next)
    }
    return pre + wrapper(nextPath, key, next)
  })

  return src
}

module.exports = function(source) {
  this.cacheable(false)
  try {
    var appPath = path.resolve(__dirname, '../src/model')
    var layoutPath = path.resolve(__dirname, '../src/page')
    this.addContextDependency(appPath)
    this.addContextDependency(layoutPath)
    appPath = appPath + '/'
    layoutPath = layoutPath + '/'

    var src = CodeMerge(appPath, wrapperModel)
    var src2 = CodeMerge(layoutPath, wrapperLayout)

    console.log(chalk.green('adding pages...'))
    console.log(chalk.green('adding module...'))
    console.log(source + '\n\n' + src + src2)
    return source + '\n\n' + src + src2
  } catch (e) {
    console.log(chalk.red('please create a module folder in `{your app}/src/`'))
    throw e
  }
}
