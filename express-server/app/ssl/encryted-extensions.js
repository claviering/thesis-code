let encrytedExtensions = {
  HandShake_Type: 'Encryted Extensions',
  HandShakeProtocal: 'Encryted Extensions',
  Extensions: {
    Type: ''
  }
}

module.exports = (recordLayer) => {
  if (recordLayer.Extension && recordLayer.Extension.early_data === 'early_data') {
    encrytedExtensions.Extensions.Type = 'early_data'
  } else {
    encrytedExtensions.Extensions.Type = ''
  }
  global.EncrytedExtensions = JSON.stringify(encrytedExtensions)
  return encrytedExtensions
}