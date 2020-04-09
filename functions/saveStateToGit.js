var GitHub = require('github-api')
axios = require('axios')
querystring = require('querystring')

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }
  console.log(event.body)
  const state = querystring.parse(event.body)
  console.log(state)

  var github = new GitHub({
    token: process.env.GIT_AUTH,
  })
  var repository = github.getRepo(process.env.GIT_USER, process.env.GIT_REPO)
  let res = await repository.writeFile(
    'master',
    'static/state.json',
    JSON.stringify(state),
    '🧙‍♂️Updated content via site',
    function(err) {
      if (err) {
        console.log(err)
        return { statusCode: 400, body: 'failed' }
      }

      console.log('success>>')
      return { statusCode: 200, body: 'success' }
    }
  )
  console.log(res)
  return res.data
}
