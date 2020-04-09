axios = require('axios')
AWS = require('aws-sdk')

exports.handler = async (event, context) => {
  AWS.config.update({
    region: 'eu-west-2',
    secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS,
    accessKeyId: process.env.ACCESS_KEY_ID_AWS,
  })

  var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' })

  var params = {
    TableName: 'live-content-draft',
    Key: {
      date: { S: 'latest' },
    },
  }
  let state
  await ddb.getItem(params, async function(err, data) {
    if (err) {
      console.error(err)
    } else {
      state = JSON.parse(data.Item.state.S)
      console.log(state)
      return { status: 200, body: state }
    }
  })
  console.log('end')
  console.log(state)
  return { status: 200, body: state }
}
