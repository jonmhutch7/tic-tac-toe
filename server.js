var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, { 
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    req.on('data', function (data) {
        console.log(data);
    });
}).listen(8080, '127.0.0.1');

console.log('Server Running');