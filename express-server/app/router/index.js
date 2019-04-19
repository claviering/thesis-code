const defaultRouter = require('./default')
const banktRouter = require('./bank')
const userRouter = require('./user')
const goodsRouter = require('./goods')
const commentRouter = require('./comment')

module.exports = (app) => {
  app.use(defaultRouter)
  app.use('/api/bank', banktRouter)
  app.use('/api/user', userRouter)
  app.use('/api/goods', goodsRouter)
  app.use('/api/comment', commentRouter)
};