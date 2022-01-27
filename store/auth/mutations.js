export default {
  SET_REFRESH_TOKEN(state, payload) {
    state.refreshToken = payload
  },

  SET_TOKEN_EXPIRES_IN(state, payload) {
    state.tokenExpiresIn = payload
  },

  SET_USER_EMAIL(state, payload) {
    state.userEmail = payload
  },

  SET_USER_TOKEN(state, payload) {
    state.userToken = payload
  },
}
