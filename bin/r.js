const { resolve, join, relative } = require('path')
const { chinese2pinyin } = require('./chinesepinyin')

const fs = require('fs-extra')

const isMarkdown = f => /\.md$/.test(f)

const modulesMaker = (path, files) => {
  let i = files
    .filter(f => {
      if (fs.statSync(join(path, f)).isDirectory() || isMarkdown(f)) return f //isDirectory
    })
    .map(f => {
      if (fs.statSync(join(path, f)).isDirectory()) {
        const dirfiles = fs.readdirSync(join(path, f))
        let inside = modulesMaker(join(path, f), dirfiles)
        let removedf = f.replace(/^\d+./, '')
        return {
          route: chinese2pinyin(removedf).replace(' ', ''),
          title: removedf,
          path: join(path, f),
          children: inside,
          type: 'dir',
        }
      }

      const absolutePath = join(path, f)
      const relativePath = absolutePath.slice(absolutePath.indexOf('docs') - 1)

      let removedf = f.replace(/^\d+./, '').replace('.md', '')
      return {
        route: chinese2pinyin(removedf).replace(' ', ''),
        title: removedf,
        path: relativePath,
        children: void 666,
        type: 'file'
      }
    })
  return i
}

/**
 * we scan navi path
 * get every .md path to load to restory
 * @param {string} src
 */
const scan = src => {
  const naviPath = join(src)
  try {
    const files = fs.readdirSync(resolve(naviPath))
    let i = modulesMaker(naviPath, files)
    return i
  } catch {
    return []
  }
}

exports.getMarkdown = scan
