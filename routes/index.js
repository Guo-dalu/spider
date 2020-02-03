const router = require('koa-router')()

router.get('/', async (ctx) => {
  await ctx.render('index', {
    title: 'gege Land',
  })
})

router.get('/string', async (ctx) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx) => {
  ctx.body = {
    title: 'koa2 json',
  }
})

module.exports = router
