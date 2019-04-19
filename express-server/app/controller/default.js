const path = require('path')
const debug = require('debug')('app:default')

module.exports = {
  default: (req, res) => {
    res.sendFile('index.html')
  },
  tmp: (req, res) => {
    res.sendFile(path.resolve('app/public/socket.html'))
  },
  download: (req, res) => {
    let file = 'download.pdf'
    res.download(path.join('./app/public/tmp/',file), file); 
  },
  upload: (req, res) => {
    res.send('done')
  },
  test: (req, res) => {
    let len = req.body.length
    let data = 'a'
    res.send({data: data.repeat(len)})
  }
};
