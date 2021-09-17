

const https = require('https');
const fs = require('fs');


app.set('secPort', port+443);


/**
 * Create HTTPS server.
 */ 
 
const options = {
    key: fs.readFileSync(__dirname+'/server.key'),
    cert: fs.readFileSync(__dirname+'/server.cert')
};

const secureServer = https.createServer(options, app);

/**
 * Listen on provided port, on all network interfaces.
 */

secureServer.listen(app.get('secPort'), () => {
   console.log('Server listening on port', app.get('secPort'));
});
secureServer.on('error', onError);
secureServer.on('listening', onListening);
