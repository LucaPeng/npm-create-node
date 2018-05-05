import * as path from 'path';

const config = require('npmconf');

export default function getInitData(target: string): {[index:string]: any} {
  return new Promise((resolve, reject) => {
    config.load({}, (error: any, npm: any) => {
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
