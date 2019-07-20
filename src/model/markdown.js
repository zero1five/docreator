import LRU from 'lru-cache'

import config from '../globalConfig'

const resolveFilePath = (router, pathname) => {
  let fp = ''

  const recursive = (router, pathname) => {
    for (let i = 0, l = router.length; i < l; i++) {
      const { title, path, children } = router[i]
      if (children) {
        recursive(children, pathname)
      } else if (pathname === title) {
        return (fp = path)
      }
    }
  }

  recursive(router, pathname)
  return fp.replace(/\.\//, '/')
}

const readFile = path => () =>
  fetch(path, {
    method: 'GET',
    mode: 'cors'
  }).then(res => res.text())

export default {
  state: {
    cache: new LRU({ max: 20 }),
    page: {
      title: null,
      headings: null,
      html: ''
    }
  },
  reducer: {
    setPage(state, { payload }) {
      const { cache } = state
      cache.set(payload.title, payload)

      return { ...state, page: payload }
    }
  },
  effects: {
    *fetchMarkdown({ call, put, select }, { payload }) {
      const cache = yield select(state => state.markdown.cache)
      if (cache.has(payload)) {
        yield put({
          type: 'setPage',
          payload: cache.get(payload)
        })
        return
      }

      const homePath = config.homePage

      const home = {
        title: homePath,
        path: homePath[0] === '.' ? homePath.slice(1) : homePath,
        route: '/',
        type: 'file'
      }
      const fp = resolveFilePath(
        [home, ...config.navi],
        payload.replace(/^\//, '')
      ).replace(/([\u4e00-\u9fa5])/g, str => encodeURIComponent(str))
      const localPath =
        config.webpackMode === 'dev'
          ? 'http://localhost:' + config.staticServerPort + fp
          : '.' + fp
      const res = yield call(readFile(localPath))

      yield put({
        type: 'setPage',
        payload: {
          title: payload,
          headings: null,
          html: res
        }
      })
    }
  }
}
