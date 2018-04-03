const _fs = require("fs");
const _url = require("url");
const _http = require("http");
const _port = 3000;
const _startupMessage = "Datatable Demo Server listening on port " + _port + "...";
const _httpHandler = function (request, response) {
    const url = _url.parse(request.url);
    switch (url.pathname) {
        default: {
            response.writeHead(200);
            response.end(_startupMessage);
            break;
        }
        case "/demo.html":
        case "/":
        case "": {
            response.setHeader("Content-Type", "text/html");
            response.end(_fs.readFileSync("./demo.html"));
            break;
        }
        case "/Templates/datatable.html": {
            response.setHeader("Content-Type", "text/html");
            response.end(_fs.readFileSync("../Templates/datatable.html"));
            break;
        }
        case "/Templates/filter.html": {
            response.setHeader("Content-Type", "text/html");
            response.end(_fs.readFileSync("../Templates/filter.html"));
            break;
        }
        case "/Templates/pager.html": {
            response.setHeader("Content-Type", "text/html");
            response.end(_fs.readFileSync("../Templates/pager.html"));
            break;
        }
        case "/bundle.js": {
            response.setHeader("Content-Type", "text/javascript");
            response.end(_fs.readFileSync("../Bundle/bundle.js"));
            break;
        }
        case "/bundle.min.js": {
            response.setHeader("Content-Type", "text/javascript");
            response.end(_fs.readFileSync("../Bundle/bundle.min.js"));
            break;
        }
        case "/demo.json": {
            response.setHeader("Content-Type", "application/json");
            response.end(_fs.readFileSync("./demo.json"));
            break;
        }
        case "/Styles/datatable.css": {
            response.setHeader("Content-Type", "text/css");
            response.end(_fs.readFileSync("../Styles/datatable.css"));
            break;
        }
    }
    
};
_http.createServer(_httpHandler).listen(_port, function () {
    console.log(_startupMessage);
});