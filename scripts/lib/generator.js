"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Metalsmith = require('metalsmith');
var ejs = require('ejs');
var rm = require('rimraf').sync;
function gen(metadata, src, dest, removeSource) {
    if (dest === void 0) { dest = '.'; }
    return new Promise(function (resolve, reject) {
        Metalsmith(process.cwd())
            .metadata(metadata)
            .clean(false)
            .source(src)
            .destination(dest)
            .use(function (files, metalsmith, done) {
            var meta = metalsmith.metadata();
            Object.keys(files).forEach(function (fileName) {
                if (fileName.match(/\.ejs$/)) {
                    var newFileName = fileName.replace(/\.ejs/, '');
                    var t = files[fileName].contents.toString();
                    files[newFileName] = __assign({}, files[fileName], { contents: ejs.compile(t)(meta) });
                    delete files[fileName];
                }
            });
            done();
        }).build(function (err) {
            if (removeSource) {
                rm(src);
            }
            if (err) {
                reject(err);
            }
            else {
                resolve(true);
            }
        });
    });
}
exports.default = gen;
