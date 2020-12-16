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
  // invoke next() at the end of a request to help with testing!

  if (req.method === 'GET') {
    let directions = ['up', 'down', 'left', 'right'];
    let random = Math.floor(Math.random() * (5));
    let randomDir = directions[random];
    res.write(randomDir);
    res.writeHead(200, headers);
    res.end();
  } else if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  }
  next();
};
