const fs = require('fs').promises
const path = require('path')
const { getMarkdown } = require('./r')

const noop = () => {}

module.exports = async source => {
  const appDirectory = await fs.realpath(process.cwd())
  const resolveApp = relativePath => path.resolve(appDirectory, relativePath)
  const configPath = resolveApp('doc.config.js')
  const docsPath = resolveApp('docs')

  const selector = getMarkdown(docsPath)

  let config = {}
  await fs
    .stat(configPath)
    .then(() => {
      config = Object.assign({}, require(configPath), {
        navi: selector
      })
    })
    .catch(noop)

  return `var creatorConfig = ${JSON.stringify(config)};\n\n` + source
}
