export default {
  state: {
    count: 0
  },
  reducer: {
    mapCount(state, { payload }) {
      return { ...state, count: payload }
    }
  },
  effects: {
    *Increase({ put }, { payload }) {
      yield put({ type: 'mapCount', payload })
    }
  }
}
