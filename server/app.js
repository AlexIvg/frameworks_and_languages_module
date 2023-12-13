// from https://expressjs.com/en/starter/hello-world.html

const express = require('express')
const app = express()
const port = 8000

app.get('/', (req, res) => {
  res.json({ hello: 'world' })
  //res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// ---

app.get('/error', (req, res) => {
  throw new Error ("it's broken")  // test error handling
})
// https://expressjs.com/en/guide/error-handling.html
app.use(function (err, req, res, next) {
  console.error(err.stack)
  debugger;  // `NODE_INSPECT_RESUME_ON_START=1 node inspect app.js`  // https://nodejs.org/api/debugger.html
  res.status(500).send('Something broke!')
})

// ---

// Docker container exit handler - https://github.com/nodejs/node/issues/4182
process.on('SIGINT', function() {process.exit()})
