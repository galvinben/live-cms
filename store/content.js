import stateJSON from '@/static/state.json'

export const state = () => ({
  mainTitle: '',
  someWords: '',
  buttonWords: 'I be a link',
})

export const mutations = {
  setState(state, payload) {
    state[payload.key] = payload.value
  },
  updateWords(state, payload) {
    state[payload.stateRef] = payload.newWords
  },
}

export const actions = {
  updateWords({ commit }, payload) {
    commit('updateWords', payload)
  },

  async setStateOnCreated({ commit }) {
    Object.keys(stateJSON).forEach((key) => {
      commit('setState', { key, value: stateJSON[key] })
    })
  },
}
