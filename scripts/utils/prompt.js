"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer = require("inquirer");
exports.default = {
    askSupportTs: function () {
        return inquirer.prompt([{
                name: 'supportTs',
                type: 'confirm',
                message: 'Is typescript used in this project or not, default is No:',
                default: false,
            }]);
    },
    askIfORNot: function (question, defaultValue) {
        if (defaultValue === void 0) { defaultValue = true; }
        return inquirer.prompt([{
                name: 'yesOrNot',
                type: 'confirm',
                message: question,
                default: defaultValue,
            }]);
    },
    askForAnswer: function (question) {
        return inquirer.prompt([{
                name: 'answer',
                type: 'input',
                message: question,
            }]);
    },
};
