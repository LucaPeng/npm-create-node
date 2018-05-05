import * as inquirer from 'inquirer';

export default function prompt(data: any): inquirer.Answers {
  return inquirer.prompt([{
    name: 'name',
    message: 'Module name',
    default: data.module.name,
  }, {
    name: 'prefix',
    type: 'input',
    message: 'Repository prefix',
    default: '',
    filter(input) {
      return input && input.length ? `${input}-` : '';
    },
  }, {
    name: 'version',
    type: 'input',
    message: 'Version',
    default: data.module.version,
  }, {
    name: 'description',
    type: 'input',
    message: 'Description',
    default: '',
  }, {
    name: 'keywords',
    type: 'input',
    message: 'Keywords',
    default: '',
    filter(input) {
      const words = !input || !input.length ? [] : input.replace(/^\s+|\s+$/g, '').split(/[,\s]+/g);
      return JSON.stringify(words);
    },
  }, {
    name: 'license',
    type: 'list',
    message: 'License',
    default: data.module.licenseType,
    choices: [
      'MIT',
      'ISC',
      'CC0',
      'BSD-3-Clause',
      'BSD-2-Clause',
      'GPL-3.0',
      'Apache-2.0',
      'Unlicense',
    ],
  }, {
    name: 'main',
    type: 'input',
    message: 'Entry point',
    default: 'scripts/index.js',
  }, {
    name: 'test',
    type: 'input',
    message: 'Tests',
    default: 'echo \\"Error: no test specified\\" && exit 1',
  }]);
}
