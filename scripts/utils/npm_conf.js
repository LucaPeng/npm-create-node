"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var config = require('npmconf');
function getInitData(target) {
    return new Promise(function (resolve, reject) {
        config.load({}, function (error, npm) {
            if (error != null) {
                reject(error);
            }
            resolve({
                date: {
                    year: new Date().getFullYear(),
                },
                author: {
                    name: npm.get('init.author.name'),
                    url: npm.get('init.author.url'),
                    email: npm.get('init.author.email'),
                    github: npm.get('init.author.github'),
                },
                module: {
                    name: path.basename(target),
                    version: npm.get('init.version'),
                    licenseType: npm.get('init.license'),
                    license: '',
                },
                repo: {
                    prefix: '',
                },
            });
        });
    });
}
exports.default = getInitData;
