const { mergeConfig } = require('./cli')

module.exports = async source => {
  const config = await mergeConfig()
  return `var creatorConfig = ${JSON.stringify(config)};\n\n` + source
}
