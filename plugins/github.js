var GitHub = require('github-api')
import Vue from 'vue'

const GithubAPI = {
  methods: {
    saveStateToGithub(state) {
      var github = new GitHub({
        token: process.env.gitAuth,
      })
      console.log(github)
      var repository = github.getRepo(process.env.gitUser, process.env.gitRepo)
      console.log(repository)
      repository.writeFile(
        'master',
        'static/state.json',
        JSON.stringify(state),
        '🧙‍♂️Updated content via site',
        function(err) {
          console.log(err)
          console.log('success')
        }
      )
    },
  },
}

export default GithubAPI

Vue.mixin(GithubAPI)
