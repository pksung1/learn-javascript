const express = require('express')

const router = express.Router();

router.get('/', (req, res) => {
  res.write('/ user login')
  res.end();
})

router.get('/info', (req, res) => {
  const data = JSON.stringify({id: 'seonpark'});
  res.writeHead(200, {'Content-Type': 'application/json', 'Content-Length': data.length})
  res.write(data)
  res.end()
})

module.exports = router;