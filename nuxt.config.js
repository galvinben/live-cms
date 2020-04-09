if (process.env.NODE_ENV !== 'production') require('dotenv').config()

export default {
  plugins: ['@/plugins/github'],
  env: {
    awsSecret: process.env.SECRET_ACCESS_KEY_AWS,
    awsID: process.env.ACCESS_KEY_ID_AWS,
    tableName: process.env.TABLE_NAME,
    gitAuth: process.env.GIT_AUTH,
    gitUser: process.env.GIT_USER,
    gitRepo: process.env.GIT_REPO,
  },
}
