const http = require('http');
const port = process.env.PORT || 8000;
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

http.createServer(function (req, res) {

    res.writeHead(200, {'Content-Type': 'text/html'});

    console.log(req.url);

    httpReq = XMLHttpRequest();
    httpReq.onreadystatechange = XMLHttpRequestCompleted;
    
    httpReq.open("GET", `http://localhost:9000${req.url}`);
    httpReq.send();

    httpReq.onreadystatechange = (e) => {
        res.end(httpReq.responseText);
        // console.log(http.responseText)
    }

}).listen(port);