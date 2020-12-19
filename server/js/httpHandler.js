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

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  if (req.method === 'GET') {

    if (req.url.indexOf('?') !== -1) {
      let direction = req.url.split('?')[1].toLowerCase() || null;
      res.writeHead(200, headers);
      res.write(direction);
      res.end();
      next();
      return;
    }

    if (req.url === '/background.jpg') {
      fs.readFile(this.backgroundImageFile, (err, data) => {
        if (err) {
          console.log(err);
          res.writeHead(404, {'Content-Type': 'image/jpeg'});
          res.end();
          next();
        } else {
          res.writeHead(200, {'Content-Type': 'image/jpeg'});
          res.write(data);
          res.end();
          next();
        }
      });
    }
  } else if (req.method === 'POST') {
    console.log('POSTDATA: ', req._postData);
    fs.writeFile(this.backgroundImageFile, req._postData, 'binary', (err) => {
      if (err) {
        res.writeHead(404, headers);
        res.end();
        next();
      } else {
        console.log('SUCCESS');
        res.writeHead(201, headers);
        //res.write(data);
        res.end();
        next();
      }
    });
  } else if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
    next();
  }
  //next(); // invoke next() at the end of a request to help with testing!
};
