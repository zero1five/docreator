#! /usr/bin/env node
const path = require('path')
const paths = require('./paths')
const fs = require('fs').promises
const [mode, sourcePath, ...options] = process.argv.slice(2)
const { getMarkdown } = require('./r')
const defaults = require('../config')

const loadDirFileNames = cPath =>
  fs
    .readdir(cPath)
    .then(files => {
      return files
    })
    .catch(err => {
      console.error(err)
      return []
    })

const mergeConfig = async (external = {}) => {
  const appDirectory = await fs.realpath(process.cwd())
  const resolveApp = relativePath =>
    path.resolve(appDirectory, sourcePath, relativePath)
  const configPath = resolveApp('doc.config.js')
  const doConfig = require(configPath)
  const docsPath = resolveApp('docs')
  const in_cpath = path.resolve(paths.appSrc, './builtIn-components')
  const cPath = resolveApp(doConfig.componentPath || defaults.componentPath)

  const selector =
    doConfig.sideMenu && doConfig.sideMenu.length > 0
      ? doConfig.sideMenu
      : getMarkdown(docsPath)

  const in_cpNames = await loadDirFileNames(in_cpath)
  const out_cpNames = await loadDirFileNames(cPath)

  let config = {}
  await fs
    .stat(configPath)
    .then(() => {
      config = Object.assign(defaults, doConfig, external, {
        navi: selector,
        directoryPath: resolveApp('.'),
        in_cpNames,
        out_cpNames
      })
    })
    .catch(err => {
      throw err
    })

  return config
}

module.exports = {
  mergeConfig
}

const run = async mode => {
  const cmdPath = path.resolve(__dirname, `${mode}.js`)
  await fs.stat(cmdPath).catch(() => {
    process.emit(
      'error',
      new Error('docreator accepts only dev and build mode')
    )
  })

  const config = await mergeConfig({ webpackMode: mode })

  const cmd = require(cmdPath)
  cmd(sourcePath, options, config)
}

run(mode)
