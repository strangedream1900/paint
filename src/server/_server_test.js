"use strict";
var server = require("./server.js");
var http = require("http");

exports.tearDown = function (done) {
    server.stop(function () {
        done();
    });
};

exports.testServerRespondsToGetRequests = function (test) {
    server.start();
    http.get("http://192.168.129.140:8089", function (response) {
        response.on("data", function(){});
        test.done();
    });
};