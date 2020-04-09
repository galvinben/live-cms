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
    AWS.config.update({
      region: 'eu-west-2',
      secretAccessKey: process.env.awsSecret,
      accessKeyId: process.env.awsID,
    })

    var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' })

    var params = {
      TableName: process.env.tableName,
      Key: {
        date: { S: 'latest' },
      },
    }

    await ddb.getItem(params, async function(err, data) {
      if (err) {
        console.error(err)
      } else {
        let state = JSON.parse(data.Item.state.S)
        Object.keys(state).forEach((key) => {
          commit('setState', { key, value: state[key] })
        })
      }
    })
    return
  },
}
