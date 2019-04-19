const fs = require('fs')
const path = require('path')
const nonce = require(path.resolve('./app/utils/nonce'))
const tickers = require(path.resolve('./app/utils/ticker'))

let newSessionTicket = {
  HandShake_Type: 'New Session Ticket',
  SessionTicketLifeTimeHint: 300,
  SessionTicketAgeAdd: 300,
  SessionTicketNonce: 300,
  SessionTicket: 'SessionTicket',
  Extension: {
    Type: 'early_data',
    MaximumEarlyDataSize: 16384
  }
}

module.exports = () => {
  newSessionTicket.SessionTicket = nonce(25)
  const ticker = newSessionTicket.SessionTicket
  const value = '1'
  const tickerTime = 5 * 60 // 5mim
  tickers.setTicker(ticker, value, tickerTime)
  return newSessionTicket
}