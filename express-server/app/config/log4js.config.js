let appenders = {
  client: {
    type: 'datefile',
    filename: `logs/client-node-server-log`,
    pattern: '-yyyy-MM-dd.log',
    alwaysIncludePattern: true
  },
  out: {
    type: 'console'
  }
}
let categories = {
  default: {
    appenders: Object.keys(appenders),
    level: 'debug'
  }
}
let config = {
  appenders,
  categories
}
module.exports = config