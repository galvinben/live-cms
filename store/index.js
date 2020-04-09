export const state = () => ({
  admin: false,
})

export const mutations = {
  logIn(state, payload) {
    state.admin = true
  },
  logOut(state, payload) {
    state.admin = false
  },
}

export const actions = {
  logIn({ commit }) {
    commit('logIn')
  },
  logOut({ commit }) {
    commit('logOut')
  },
}
