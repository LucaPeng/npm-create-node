const Metalsmith = require('metalsmith');
const ejs = require('ejs');
const rm = require('rimraf').sync;

export default function gen(metadata: {[index: string]: any}, src: string, dest: string = '.', removeSource?: false) {
  return new Promise((resolve, reject) => {
    Metalsmith(process.cwd())
      .metadata(metadata)
      .clean(false)
      .source(src)
      .destination(dest)
      .use((files: {[index: string]: any}, metalsmith: any, done: any) => {
        const meta = metalsmith.metadata();
        Object.keys(files).forEach((fileName) => {
          if (fileName.match(/\.ejs$/)) {
            const newFileName = fileName.replace(/\.ejs/, '');
            const t = files[fileName].contents.toString();
            files[newFileName] = {
              ...files[fileName],
              contents: ejs.compile(t)(meta),
            };
            delete files[fileName];
          }
        });
        done();
      }).build((err: any) => {
        if (removeSource) {
          rm(src);
        }
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
  });
}
