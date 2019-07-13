import LRU from 'lru-cache'

import config from '../globalConfig'

const resolveFilePath = (router, pathname) => {
  let fp = ''

  const recursive = (router, pathname) => {
    for (let i = 0, l = router.length; i < l; i++) {
      const { name, path, children } = router[i]
      if (children) {
        recursive(children, pathname)
      } else if (pathname === name) {
        return (fp = path)
      }
    }
  }

  recursive(router, pathname)
  return fp
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
        name: homePath,
        path: homePath[0] === '.' ? homePath.slice(1) : homePath,
        route: '/',
        type: 'file',
        header: []
      }
      const fp = resolveFilePath(
        [home, ...config.navi],
        payload.replace(/^\//, '')
      )
      const res = yield call(
        readFile('http://localhost:' + config.staticServerPort + fp)
      )

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
