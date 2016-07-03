"use strict";

var child_process = require("child_process");
var http = require("http");
var child;

exports.setUp = function(done){
    runServer(done);
};

exports.tearDown = function (done) {
    child.on("exit", function (code, signal) {
        done();
    });
    child.kill();


};

exports.test_canGetHomePage = function (test) {
        httpGet("http://192.168.129.140:8089", function (response, receivedData) {
            var foundHomePage = receivedData.indexOf("WeeWikiPaint home page") !== -1;
            test.ok(foundHomePage, "home page should have contained test marker");
            test.done();
    });
};

exports.test_canGet404Page = function(test) {
            httpGet("http://192.168.129.140:8089/nonexistant.html", function (response, receivedData) {
            var foundHomePage = receivedData.indexOf("WeeWikiPaint 404 page") !== -1;
            test.ok(foundHomePage, "404 page should have contained test marker");
            test.done();
    });
};

// TODO: check the 404 page

function runServer(callback) {
    child = child_process.spawn("node", ["src/server/wikipaint", "8089"]);
    child.stdout.setEncoding("utf8");
    child.stdout.on("data", function (chunk) {
        process.stdout.write("server stdout: " + chunk);
        if (chunk.trim() === "Server started") {
            callback();
        }
    });
}

function httpGet(url, callback) {
    var request = http.get(url);
    request.on("response", function (response) {
        var receivedData = "";
        response.setEncoding("utf8");

        response.on("data", function (chunk) {
            receivedData += chunk;
        });

        response.on("end", function () {
            callback(response, receivedData);
        });
    });
}