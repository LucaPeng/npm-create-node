"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var prompt_1 = require("./prompt");
var chalk = require('chalk');
function hasFile(filePath) {
    if (filePath) {
        var s = void 0;
        try {
            s = fs.statSync(filePath);
        }
        catch (e) {
            return false;
        }
        return s;
    }
    else {
        return false;
    }
}
function checkExist(filePath, askForOverWrite) {
    if (askForOverWrite === void 0) { askForOverWrite = false; }
    return new Promise(function (resolve) {
        var fileStat = hasFile(filePath);
        if (fileStat && fileStat.isFile()) {
            if (askForOverWrite) {
                prompt_1.default.askIfORNot(filePath + "\u6587\u4EF6\u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8981\u8986\u76D6").then(function (res) {
                    if (res.yesOrNot) {
                        resolve(false);
                    }
                    else {
                        resolve(true);
                    }
                });
            }
            else {
                resolve(true);
            }
        }
        else {
            resolve(false);
        }
    });
}
function checkExistFolder(path, askForOverWrite) {
    if (askForOverWrite === void 0) { askForOverWrite = false; }
    return new Promise(function (resolve) {
        var fileStat = hasFile(path);
        if (fileStat && fileStat.isDirectory()) {
            if (askForOverWrite) {
                prompt_1.default.askIfORNot(path + "\u8DEF\u5F84\u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8981\u8986\u76D6").then(function (res) {
                    if (res.yesOrNot) {
                        resolve(false);
                    }
                    else {
                        resolve(true);
                    }
                });
            }
            else {
                resolve(true);
            }
        }
        else {
            resolve(false);
        }
    });
}
function syncModifyFile(filePath, encode, pattern, replace) {
    if (encode === void 0) { encode = 'utf8'; }
    var fileContent;
    try {
        fileContent = fs.readFileSync(filePath, encode);
    }
    catch (err) {
        console.log(chalk.red("read " + filePath + " failed"));
        return false;
    }
    var newFileContent = fileContent.replace(pattern, replace);
    try {
        fs.writeFileSync(filePath, newFileContent);
    }
    catch (err) {
        console.log(chalk.red("modify " + filePath + " failed"));
        return false;
    }
    return true;
}
exports.default = {
    hasFile: hasFile,
    checkExist: checkExist,
    syncModifyFile: syncModifyFile,
    checkExistFolder: checkExistFolder,
};
