const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use('/api', router)

server.listen(5000, () => {
  console.log('JSON Server is running at http://localhost:5000/api')
})
