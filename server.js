var http = require('http'),
   fs = require('fs'),
   path = require('path');

http.createServer(function (request, response) {
   var filepath = '.' + request.url;
   if (filepath == './') {
      filepath = './index.html';
   }
      
   var ext = path.extname(filepath);
   var contentType = 'text/html';

   if (ext == '.js') {
      contentType = 'text/javascript';
   }
   if (ext == '.css') {
      contentType = 'text/css';
   }
   
   fs.readFile(filepath, function(error, content) {
      if (error) {
         response.end();
      } else {
         response.writeHead(200, { 
            'Content-Type': contentType,
            'Access-Control-Allow-Origin': '*',
         });
         response.end(content);
      }
   });

   request.on('data', function (data) {
      console.log('Received Data:');
      console.log(JSON.parse(data));
   });

}).listen(1234);

console.log('Site is running at http://127.0.0.1:1234/index.html');