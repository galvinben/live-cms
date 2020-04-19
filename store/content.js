import stateJSON from '@/static/state.json'

export const state = () => ({
  mainTitle: '',
  someWords: '',
  buttonWords: 'I be a link',
  images: {
    imageOne: require('@/assets/bread.jpg'),
  },
})

export const mutations = {
  SET_STATE(state, payload) {
    state[payload.key] = payload.value
  },
  UPDATE_WORDS(state, payload) {
    state[payload.stateRef] = payload.newWords
  },
  UPDATE_IMAGE_URL(state, payload) {
    state.images[payload.stateRef] = payload.url
  },
}

export const actions = {
  updateWords({ commit }, payload) {
    commit('UPDATE_WORDS', payload)
  },
  uploadImage({ commit }, payload) {
    commit('UPDATE_IMAGE_URL', payload)
  },
  async setStateOnCreated({ commit }) {
    Object.keys(stateJSON).forEach((key) => {
      commit('SET_STATE', { key, value: stateJSON[key] })
    })
  },
}
