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
  // console.log(res)
  if (req.method === 'GET') {
    // let directions = ['up', 'down', 'left', 'right'];
    // let random = Math.floor(Math.random() * (4));
    // let randomDir = directions[random];
    //console.log(req.url.slice(2));
    res.writeHead(200, headers);
    //var direction = req.addListener('data', (val) => {console.log(val.url)});
    //console.log(direction);
    res.write(req.url.slice(2).toLowerCase());
    res.end();
  } else if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  }
  next(); // invoke next() at the end of a request to help with testing!
};
