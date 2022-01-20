const http = require('http')
const fs = require('fs').promises


http.createServer(async (req, res) => {
    const serverHTML = await fs.readFile('./server.html')
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(serverHTML);
}).listen(8080, () => {
    console.log('8080포트에서 대기중')
})