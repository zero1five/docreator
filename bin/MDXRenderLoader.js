const { resolveApp, insertStr } = require('./utils')

module.exports = async source => {
  const currPath = resolveApp('')
  const extraStr =
    `\n\nvar loadInCpNamesWithWabpck = fileName => require('../../builtIn-components/' + fileName).default;\n` +
    `var loadOutCpNamesWithWabpck = (cPath, fileName) => require('${currPath}' + '/' + cPath + '/' + fileName).default;`

  source = insertStr(source, source.indexOf('\n\n'), extraStr)

  return source
}
