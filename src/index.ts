import prompt from './lib/prompt';
import fileUtil from './utils/file';
import getInitData from './utils/npm_conf';
import * as path from 'path';
import gen from './lib/generator';

interface CreateResult {
  success: boolean;
  res: string;
}

module.exports = {
  setConfig() {
    //
  },
  async createPkg(name: string, targetDir = process.cwd()): Promise <CreateResult> {
    const target = path.resolve(targetDir, `./${name}`);
    try {
      if (await fileUtil.checkExistFolder(target, true)) {
        return {
          success: false,
          res: 'current path exist',
        };
      }
      const metaData = await getInitData(target);
      const results = await prompt(metaData);
      metaData.module.name = results.name;
      metaData.repo.prefix = results.prefix;
      metaData.module.version = results.version;
      metaData.module.description = results.description;
      metaData.module.keywords = results.keywords;
      metaData.module.licenseType = results.license.type;
      metaData.module.main = results.main;
      metaData.module.test = results.test;
      metaData.module.license = results.license;

      const templateDir = path.resolve(__dirname, '../.templates');
      // console.log(metaData)
      await gen(metaData, templateDir, target);
      return {
        success: true,
        res: target,
      };
    } catch (err) {
      return {
        success: false,
        res: err,
      };
    }
  },
};
