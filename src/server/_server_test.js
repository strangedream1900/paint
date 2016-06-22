"use strict";
var server = require("./server.js");
var http = require("http");

exports.tearDown = function (done) {
    server.stop(function () {
        done();
    });
};

exports.test_serverReturnHelloWorld = function (test) {
    server.start();
    var request = http.get("http://192.168.129.140:8089");
    request.on("response", function (response) {
        var receivedData = false;
        response.setEncoding("utf8");
        test.equals(200, response.statusCode, "status code");
        response.on("data", function (chunk) {
            receivedData = true;
            test.equals("Hello World", chunk, "response text");
        });
        response.on("end", function () {
            test.ok(receivedData, "should have received response data");
            test.done();
        });



    });
};