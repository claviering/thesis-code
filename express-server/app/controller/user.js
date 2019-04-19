const path = require('path')
const userModel = require(path.resolve('./app/models/user'))
const bankModel = require(path.resolve('./app/models/bank'))
const tickers = require(path.resolve('./app/utils/ticker'))
const HKDF = require(path.resolve('./app/utils/hkdf'))
const debug = require('debug')('app:user')

module.exports = {
  /**
   * @api {post} /api/user/login login in the app
   * @apiVersion 0.0.1
   * @apiName Login
   * @apiGroup User
   *
   * @apiParam {String} name Users unique name
   * @apiParam {String} password Users unique password
   *
   * @apiSuccess {Booleam} success success true or false
   * @apiSuccess {String} msg return message
   */
  login: async (req, res) => {
    let {
      name,
      password
    } = req.body
    let findUser = await userModel.findOne({
      name
    })
    if (!findUser) {
      res.send({
        login: false,
        msg: '用户不存在'
      })
      return
    }
    if (password === findUser.password) {
      let ticker = HKDF(name + password)
      tickers.setTicker(ticker)
      // 5分钟
      let tickerTime = Date.now() + 5 * 60 * 1000
      tickerTime = tickerTime + ''
      tickers.setTicker(ticker, tickerTime)
      res.send({
        login: true,
        msg: '登陆成功'
      })
      return
    } else {
      res.send({
        login: false,
        msg: '密码错误'
      })
    }
  },
  /**
   * @api {post} /api/user/register register
   * @apiVersion 0.0.1
   * @apiName register
   * @apiGroup User
   *
   * @apiParam {String} name Users unique name
   * @apiParam {String} password Users unique password
   * @apiParam {String} passwordAgain Users unique password again
   *
   * @apiSuccess {Booleam} success success true or false
   * @apiSuccess {String} msg  return message
   */
  register: async (req, res) => {
    try {
      const {
        name,
        password,
        passwordAgain
      } = req.body
      if (password !== passwordAgain) {
        res.send({
          success: false,
          msg: '输入两次密码不正确'
        })
        return
      }
      let findUserName = await userModel.findOne({
        name
      })
      if (findUserName) {
        res.send({
          success: false,
          msg: '用户名已经被注册'
        })
        return
      }
      const newUser = new userModel({
        name,
        password,
      })
      let user = await newUser.save()
      const newBankUser = new bankModel({
        name
      })
      newBankUser.save()
      if (user) {
        res.send({
          success: true,
          msg: '注册成功'
        })
      } else {
        res.send({
          success: false,
          msg: '注册失败'
        })
      }
    } catch (err) {
      res.send({
        err
      })
    }
  }
};