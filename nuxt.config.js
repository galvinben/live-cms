if (process.env.NODE_ENV !== 'production') require('dotenv').config()

export default {
  plugins: [],
  env: {
    awsSecret: process.env.SECRET_ACCESS_KEY_AWS,
    awsID: process.env.ACCESS_KEY_ID_AWS,
    tableName: process.env.TABLE_NAME,
  },
}
