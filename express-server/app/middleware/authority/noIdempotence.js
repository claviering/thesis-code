module.exports = (req, res) => {
  res.send('不允许非幂等性请求')
}