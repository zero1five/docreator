module.exports = async source => {
  let insertStr = (soure, start, newStr) => {
    return soure.slice(0, start) + newStr + soure.slice(start)
  }
  const extraStr =
    `\n\nvar loadInCpNamesWithWabpck = fileName => require('../../builtIn-components/' + fileName).default;\n` +
    `var loadOutCpNamesWithWabpck = (cPath, fileName) => require('/Users/apple/Documents/lab/docreator/website/' + cPath + '/' + fileName).default;`

  source = insertStr(source, source.indexOf('\n\n'), extraStr)

  return source
}
