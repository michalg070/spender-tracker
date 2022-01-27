export default {
  getUserToken(state) {
    return state.userToken
  },
  isTokenExpired(state) {
    if (!state.userToken || Date.now() < state.tokenExpiresIn) {
      return true
    }

    return false
  },
  isUserAuthenticated(state) {
    return !!state.userToken
  },
}
