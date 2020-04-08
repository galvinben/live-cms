export const state = () => ({
  admin: true,
  mainTitle: '',
})

export const mutations = {
  setState(state, payload) {
    console.log(payload)
    state[payload.key] = payload.value
  },
  updateWords(state, payload) {
    state[payload.stateRef] = payload.newWords
  },
}

export const actions = {
  async nuxtServerInit({ commit }) {
    let data = {
      admin: true,
      mainTitle: 'Title',
      someWords:
        'I am a blog post, about some cool shit. I am a blog post, about some cool shit. I am a blog post, about some cool shit. I am a blog post, about some cool shit. I am a blog post, about some cool shit. I am a blog post, about some cool shit. I am a blog post, about some cool shit. I am a blog post, about some cool shit. I am a blog post, about some cool shit. I am a blog post, about some cool shit. I am a blog post, about some cool shit. I am a blog post, about some cool shit. I am a blog post, about some cool shit. ',
    }
    const data = await axios.get(`/.netlify/functions/getState`)
    Object.keys(data).forEach((key) => {
      commit('setState', { key, value: data[key] })
    })
  },
}
