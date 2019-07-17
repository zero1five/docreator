#! /usr/bin/env node
const path = require('path')
const fs = require('fs').promises
const [mode, sourcePath, ...options] = process.argv.slice(2)
const { getMarkdown } = require('./r')
const defaults = require('../config')

const mergeConfig = async (external = {}) => {
  const appDirectory = await fs.realpath(process.cwd())
  const resolveApp = relativePath =>
    path.resolve(appDirectory, sourcePath, relativePath)
  const configPath = resolveApp('doc.config.js')
  const doConfig = require(configPath)
  const docsPath = resolveApp('docs')

  const selector =
    doConfig.sideMenu && doConfig.sideMenu.length > 0
      ? doConfig.sideMenu
      : getMarkdown(docsPath)

  let config = {}
  await fs
    .stat(configPath)
    .then(() => {
      config = Object.assign(defaults, doConfig, external, {
        navi: selector,
        directoryPath: resolveApp('.')
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
