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
      return;
    }

    if (req.url === '/background.jpg') {
      fs.readFile(this.backgroundImageFile, 'utf8', (err, data) => {
        if (err) {
          console.log(err);
          res.writeHead(404, {'Content-Type': 'image/jpeg' });
          //console.log(res); //Response code is correct, but for some reason not mapped to aJax response
          res.end();
          return;
        }
        res.writeHead(200, {'Content-Type': 'image/jpeg' });
        res.end(data);
        next();
      });

    }
  } else if (req.method === 'POST') {
    try {
      // Writes image to background.jpg
      let background = this.backgroundImageFile;
      req.addListener('data', (postData) => (
        fs.writeFileSync(background, postData)
      ));

      try {
        const data = fs.readFileSync(background, 'utf8')
        //file written successfully
        console.log('SUCCESS');
        res.writeHead(201, headers);
        res.write(data);
        res.end();
      } catch (err) {
        console.error('Read file sync failed: ', err)
      }

    } catch (err) {
      console.error(err)
    }
  } else if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  }
  next(); // invoke next() at the end of a request to help with testing!
};
