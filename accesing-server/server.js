const http = require('http');
const port = process.env.PORT || 8000;
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

http.createServer(function (req, res) {

    const oReq = new XMLHttpRequest();
    let retVal = undefined;

    res.writeHead(200, {'Content-Type': 'text/html'});
    console.log(req.url);
    
    oReq.open("GET", `http://localhost:9000${req.url}`);
    oReq.send();

    let sentBoolCheck = false;
    oReq.onreadystatechange = (e) => {
        if ( oReq.status == 200 && !sentBoolCheck ) {
            sentBoolCheck = true;
            retVal = oReq.responseText;
            res.end(retVal);  
        }
        console.log(oReq.status);
    }

}).listen(port);