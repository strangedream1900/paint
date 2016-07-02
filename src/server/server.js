"use strict";

var http = require("http");
var server;
var fs = require("fs");

exports.start = function (homePageFileToServe, notFoundPageToServe, portNumber) {
    if (!portNumber) { throw "port number is required"; }

    server = http.createServer();
    server.on("request", function (request, response) {
        if (request.url === "/" || request.url === "/index.html") {
            response.statusCode = 200;
            serveFile(response, homePageFileToServe);
        } else {
            response.statusCode = 404;
            serveFile(response, notFoundPageToServe);
        }
    });

    server.listen(portNumber);
};

exports.stop = function (callback) {
    server.close(callback);
};

function serveFile(response, file) {
    fs.readFile(file, function (err, data) {
        if (err) { throw err; }
        response.end(data);
    });
}

