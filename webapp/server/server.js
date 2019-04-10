const fs = require('fs');
const https = require('https');
const http = require('http');
const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();

const SSL_KEY = process.env.SSL_KEY;
const SSL_PEM = process.env.SSL_PEM;
const KEY_PASS = process.env.KEY_PASS;
const HTTPS_ON = process.env.HTTPS_ON || 'NO';

//TODO: Seperate Proxy to a different file
const proxy = require('http-proxy-middleware');
//TODO: Add env var for server api endpoint
//TODO: Configure secure based on proxy
app.use(proxy('/api', {
    target: 'https://localhost:9000/',
    secure: false,
    changeOrigin: true,
    pathRewrite: {'^/api' : ''}
}));

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
    return res.send('pong');
});
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//SET UP PROXY

if (HTTPS_ON == 'YES') {
    const credentials = {
        key: fs.readFileSync(SSL_KEY),
        cert: fs.readFileSync(SSL_PEM),
        passphrase: KEY_PASS
    };
    let httpsServer = https.createServer(credentials, app);
    httpsServer.listen(port);
    console.info(`Rebloc mvp running on port ${port}.`);
}
else {
    let httpServer = http.createServer(app);
    httpServer.listen(port);
    console.info(`Rebloc mvp running on port ${port}`);
}