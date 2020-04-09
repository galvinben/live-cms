export const state = () => ({
  admin: false,
  loggingIn: false,
})

export const mutations = {
  logIn(state) {
    state.admin = true
    state.loggingIn = false
  },
  logOut(state) {
    state.admin = false
  },
  setLoggingIn(state) {
    state.loggingIn = true
  },
  unsetLoggingIn(state) {
    state.loggingIn = false
  },
}

export const actions = {
  logIn({ commit }) {
    commit('logIn')
  },
  logOut({ commit }) {
    commit('logOut')
  },
  setLoggingIn({ commit }) {
    commit('setLoggingIn')
  },
  unsetLoggingIn({ commit }) {
    commit('unsetLoggingIn')
  },
}
