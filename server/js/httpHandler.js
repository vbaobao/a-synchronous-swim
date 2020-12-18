const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

let parseUrl = function(url) {
  let urlObj = {};
  let urlList = url.split('?')[1].split('&');
  for (const option of urlList) {
    urlObj[option.split('=')[0]] = option.split('=')[1] || null;
  }
  return urlObj;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  //console.log(res)
  if (req.method === 'GET') {
    // let directions = ['up', 'down', 'left', 'right'];
    // let random = Math.floor(Math.random() * (4));
    // let randomDir = directions[random];
    let reqValues = parseUrl(req.url);

    if (reqValues.direction) {
      var direction = reqValues.direction.toLowerCase();
      res.writeHead(200, headers);
      res.write(direction);
    }

    if (reqValues.backgroundimg) {
      var background = reqValues.backgroundimg;

      if (res._data.toString().indexOf(background) !== -1) {
        res.writeHead(200, headers);
      } else {
        res.writeHead(404, headers);
      }
    }

    res.end();
  } else if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  }
  next(); // invoke next() at the end of a request to help with testing!
};
