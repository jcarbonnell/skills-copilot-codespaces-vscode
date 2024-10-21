// Create web server

// 1. Load http module
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

var comments = [];
var server = http.createServer(function(request, response) {
    // 2. Send HTTP header
    // HTTP Status: 200 : OK
    // Content Type: text/plain
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });

    // 3. Send response body as "Hello World"
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    if (pathname === '/'){
      if (queryData.id === undefined){
        fs.readdir('./data', function(error, filelist){
          var title = 'Welcome';
          var description = 'Hello, Node.js';
          var list = '<ul>';
          var i = 0;
          while (i < filelist.length){
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i = i + 1;
          }
          list = list + '</ul>';
          var template = `
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            <h2>${title}</h2>
            <p>${description}</p>
          </body>
          </html>
          `;
          response.end(template);
        });
      } else {
        fs.readdir('./data', function(error, filelist){
          var title = queryData.id;
          var list = '<ul>';
          var i = 0;
          while (i < filelist.length){
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i = i + 1;
          }
          list = list + '</ul>';
          fs.readFile(`data/${title}`, 'utf8', function(err, description){
            var template = `
            <!doctype html>
            <html>
            <head>
              <title>WEB1 - ${title}</title>