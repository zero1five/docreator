#! /usr/bin/env node
const path = require('path')
const fs = require('fs').promises
const [mode, sourcePath, ...options] = process.argv.slice(2)
const { getMarkdown } = require('./r')
const defaults = require('../config')

const noop = () => {}

const mergeConfig = async (external = {}) => {
  const appDirectory = await fs.realpath(process.cwd())
  const resolveApp = relativePath => path.resolve(appDirectory, relativePath)
  const configPath = resolveApp('doc.config.js')
  const docsPath = resolveApp('docs')

  const selector = getMarkdown(docsPath)

  let config = {}
  await fs
    .stat(configPath)
    .then(() => {
      config = Object.assign(defaults, require(configPath), external, {
        navi: selector
      })
    })
    .catch(noop)

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
