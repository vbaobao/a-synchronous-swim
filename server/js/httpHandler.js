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
  if (url.indexOf('?') === -1) { return {}; }

  let urlObj = {};
  let urlList = url.split('?')[1].split('&') || '';
  if (urlList.length !== 0) {
    for (const option of urlList) {
      urlObj[option.split('=')[0]] = option.split('=')[1];
    }
  }

  return urlObj;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  //console.log(res)
  if (req.method === 'GET') {
    let reqValues = parseUrl(req.url);

    if (reqValues.direction) {
      var direction = reqValues.direction.toLowerCase();
      res.writeHead(200, headers);
      res.write(direction);
      res.end();
      return;
    }

    if (this.backgroundImageFile) {
      var background = this.backgroundImageFile;
      try {
        const data = fs.readFileSync(background, 'utf8');
        res.writeHead(200, headers);
        res.end();
      } catch (err) {
        res.writeHead(404, headers);
        res.end();
      }
    }
  } else if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  }
  next(); // invoke next() at the end of a request to help with testing!
};
