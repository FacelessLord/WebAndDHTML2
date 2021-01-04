var http = require('http');
var url = require('url');

const server = new http.Server((req, res) => {
    console.log(req.headers);

    const urlParsed = url.parse(req.url, true);

    if (urlParsed.pathname == '/img' && urlParsed.query.cookie) {
        console.log('abacaba')
        res.end(urlParsed.query.cookie);
    } else {
        res.statusCode = 404; // Not Found
        res.end("Hey!");
    }
});


server.listen(3001, '127.0.0.1');