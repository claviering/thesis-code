module.exports = (req, res, next) => {
  let earlyData = req.get('is-early-data')
  if (earlyData) {
    res.send('Early Data')
    return
  }
  next()
}