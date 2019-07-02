const LRU = require('lru-cache')

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
      console.log(payload)
    }
  }
}
