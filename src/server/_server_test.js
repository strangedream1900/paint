"use strict";


var server = require("./server.js");
var http = require("http");
var fs = require("fs");

exports.test_serverReturnsHelloWorld = function (test) {
    server.start(8089);
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
            server.stop(function () {
                test.done();
            });
        });

    });
};

exports.test_serverServesAFile = function (test) {
    var testDir = "generated/test";
    var testFile = testDir + "/test.html";
    fs.writeFileSync(testFile, "Hello World");


    test.done();
};

exports.test_serverRunsCallbackWhenStopCompleted = function (test) {
    server.start(8089);
    server.stop(function () {
        test.done();
    });
};

exports.test_serverRequiresPortNumber = function (test) {
    test.throws(function () {
        server.start();
    });

    test.done();
};

/*
exports.test_stopCalledWhenServerIsntRunningThrowsException = function (test) {
    test.throws(function () {
        server.stop();

    });
    test.done();
};

*/

exports.test_stopErrorsWhenNotRunning = function (test) {
    server.stop(function (err) {
        test.notEqual(err, undefined);
        test.done();
    });
};
