import axios from 'axios'
import AWS from 'aws-sdk'

export const state = () => ({
  admin: false,
  mainTitle: '',
  someWords: '',
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
    let res = await axios.get(`/.netlify/functions/getState`)
    let state = JSON.parse(res.body)
    Object.keys(state).forEach((key) => {
      commit('setState', { key, value: state[key] })
    })
    return
  },
}
