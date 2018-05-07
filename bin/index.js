#!/usr/bin/env node --harmony

const params = process.argv.slice(2);
let index = 0;
const pkgGenerator = require('../scripts/index');
const chalk = require('chalk');

let name;
let path;

for(;index < params.length; index++) {
  var param = params[index];
  if (param === '--path') {
    if (params[index + 1]) {
      path = params[index + 1];
      index++;
    }
  } else {
    if (!name) {
      name = param;
    }
  }
}

if (!name) {
  console.log(chalk.red('require package name to be specified.'));
} else {
  pkgGenerator.createPkg(name, path || process.cwd()).then(res => {
    if (res && res.success) {
      console.log(chalk.green(`

      ************************      

      created finished!
      execute follow cmd within the project：
      yarn add typescript
      git init
      eslint-init --node --ts --husky // see <https://www.npmjs.com/package/eslint-init> for detail if you need eslint
      Then, Happy Coding~

      ************************

      `));
    } else {
      console.log(res && res.res);
      console.log(chalk.red('failed...'));
    }
  }, (err) => {
    console.log(err);
    console.log(chalk.red('failed...'));
  });
}

