export default {
  setRefreshToken({ commit }, payload) {
    commit('SET_REFRESH_TOKEN', payload)
  },

  setTokenExpiresIn({ commit }, payload) {
    const now = Date.now()
    const expiresIn = now + payload * 1000

    commit('SET_TOKEN_EXPIRES_IN', expiresIn)
  },

  setUserEmail({ commit }, payload) {
    commit('SET_USER_EMAIL', payload)
  },

  setUserToken({ commit }, payload) {
    commit('SET_USER_TOKEN', payload)
  },
}
