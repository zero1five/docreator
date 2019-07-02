import LRU from 'lru-cache'
import creatorConfig from '../config'

const resolveFilePath = (router, pathname) => {
  let fp = ''

  const recursive = (router, pathname) => {
    for (let i = 0, l = router.length; i < l; i++) {
      const { name, path, children } = router[i]
      if (children) {
        recursive(children, pathname, fp)
      } else if (pathname === name) {
        return (fp = path)
      }
    }
  }

  recursive(router, pathname)
  return fp
}

export default {
  state: {
    cache: new LRU({ max: 20 }),
    page: {
      title: null,
      headings: null,
      html: ''
    }
  },
  reducer: {},
  effects: {
    *fetchMarkdown({ call, put }, { payload }) {
      const fp = resolveFilePath(creatorConfig.navi, payload.replace('/', ''))
      console.log(fp)
    }
  }
}
