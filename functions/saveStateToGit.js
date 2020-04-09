var GitHub = require('github-api')
axios = require('axios')
querystring = require('querystring')

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  var github = new GitHub({
    token: process.env.GIT_AUTH,
  })
  var repository = github.getRepo(process.env.GIT_USER, process.env.GIT_REPO)
  let res = await repository.writeFile(
    'master',
    'static/state.json',
    event.body,
    '🧙‍♂️Updated content via site',
    function(err) {
      if (err) {
        console.log(err)
      }

      console.log('success')
    }
  )
  console.log(res)
  return res
}
