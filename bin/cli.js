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

  const cmd = require(cmdPath)
  cmd(sourcePath, options)
}

run(mode)
