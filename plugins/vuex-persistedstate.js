import createPersistedState from 'vuex-persistedstate'

export default (context) => {
  createPersistedState({
    reducer(obj) {
      // 其中 mobile, sidebar, user, deviceId, sessionId 为需要自动存储的 state
      const { username, authority } = obj;
      return {username, authority }
    }
  })(context.store)
}
