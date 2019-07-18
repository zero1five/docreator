const { mergeConfig } = require('./cli')

module.exports = async source => {
  const config = await mergeConfig()
  const replacer = (key, value) => {
    if (key === 'plugins') {
      return value.map(x => x.toString())
    }
    return value
  }

  return `var creatorConfig = ${JSON.stringify(config, replacer)};\n\n` + source
}
