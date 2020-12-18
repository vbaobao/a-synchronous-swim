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
  //console.log(res)
  if (req.method === 'GET') {
    // let directions = ['up', 'down', 'left', 'right'];
    // let random = Math.floor(Math.random() * (4));
    // let randomDir = directions[random];

    if (req.url.indexOf('direction=') !== -1) {
      var direction = req.url.split('direction=')[1].toLowerCase();
      var directionIndex = direction.indexOf('&');
      if (directionIndex !== -1) {
        direction.substring(0, directionIndex);
      }
      res.writeHead(200, headers);
      res.write(direction);
    }

    if (req.url.indexOf('backgroundimg=') !== -1) {
      var background = req.url.split('backgroundimg=')[1];
      var backgroundIndex = background.indexOf('&');
      if (backgroundIndex !== -1) {
        background.substring(0, backgroundIndex);
      }

      console.log(res);
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
