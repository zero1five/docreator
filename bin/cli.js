#! /usr/bin/env node
const path = require('path')
const fs = require('fs').promises
const [mode, sourcePath, ...options] = process.argv.slice(2)

const run = async mode => {
  const cmdPath = path.resolve(__dirname, `${mode}.js`)
  await fs.stat(cmdPath).catch(() => {
    process.emit(
      'error',
      new Error('docreator accepts only dev and build mode')
    )
  })

  const appDirectory = await fs.realpath(process.cwd())
  const resolveApp = relativePath => path.resolve(appDirectory, relativePath)
  const configPath = resolveApp('doc.config.js')

  let config = {}
  fs.stat(configPath)
    .then(() => {
      config = require(configPath)
    })
    .catch(() => {})

  const cmd = require(cmdPath)
  cmd(sourcePath, options, config)
}

run(mode)
