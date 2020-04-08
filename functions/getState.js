axios = require('axios')
AWS = require('aws-sdk')

exports.handler = async (event, context) => {
  AWS.config.update({ region: 'eu-west-2' })

  var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' })

  var params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      date: { S: 'latest' },
    },
  }

  ddb.getItem(params, function(err, data) {
    if (err) {
      return { statusCode: 400, body: 'Failed to access DynamoDB' }
    } else {
      return { statusCode: 200, body: data.Item }
    }
  })
}
