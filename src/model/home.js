export default {
  state: {
    count: 0
  },
  reducer: {
    mapCount(state, { payload }) {
      return { ...state, count: payload }
    }
  },
  effects: {}
}
