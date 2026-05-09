const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3001;
const filePath = path.join(__dirname, 'rabab-academy.html');

const server = http.createServer((req, res) => {
  let url = req.url;
  if (url === '/') {
    url = '/rabab-academy.html';
  } else if (url === '/languages') {
    url = '/languages.html';
  } else if (url === '/sewing') {
    url = '/sewing.html';
  } else if (url === '/hairdressing') {
    url = '/hairdressing.html';
  } else if (url === '/hijama') {
    url = '/hijama.html';
  } else if (url === '/crafts') {
    url = '/crafts.html';
  } else if (url === '/admin') {
    url = '/admin.html';
  } else if (url === '/kindergarten') {
    url = '/kindergarten.html';
  } else if (url === '/theories') {
    url = '/theories.html';
  } else if (url === '/summer') {
    url = '/summer.html';
  }
  
  const filePath = path.join(__dirname, url);
  const extname = path.extname(filePath);
  let contentType = 'text/html';

  switch (extname) {
    case '.js': contentType = 'text/javascript'; break;
    case '.css': contentType = 'text/css'; break;
    case '.json': contentType = 'application/json'; break;
    case '.png': contentType = 'image/png'; break;
    case '.jpg': contentType = 'image/jpg'; break;
    case '.gif': contentType = 'image/gif'; break;
    case '.svg': contentType = 'image/svg+xml'; break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('File not found');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
