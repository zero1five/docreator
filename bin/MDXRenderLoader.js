const { resolveApp, insertStr } = require('./utils')

module.exports = async source => {
  const sourcePath = resolveApp('')
  const extraStr = `\n\n
    var loadCpWithWabpck = (cPath, fileName) => {
      if (!fileName) {
        fileName = cPath;
        cPath = null;

        return require('../../builtIn-components/' + fileName).default;
      } else {
        return require('${sourcePath}' + '/' + cPath + '/' + fileName).default;
      }
    };`

  source = insertStr(source, source.indexOf('\n\n'), extraStr)
  return source
}
