/**
 * @description 文件操作 util
 * @author songpeng02
 */
import * as fs from 'fs';
import prompt from './prompt';

const chalk = require('chalk');

/**
 * 检测文件是否存在
 * @param {String} filePath 文件路径
 * @return {fs.Stat | Boolean} 文件信息对象 | false 代表文件不存在
 */
function hasFile(filePath: string) {
  if (filePath) {
    let s;
    try {
      s = fs.statSync(filePath);
    } catch (e) {
      return false;
    }
    return s;
  } else {
    return false;
  }
}

/**
 * 检查文件是否存在
 * @param {String} filePath 文件路径
 * @param {Boolean} askForOverWrite 是否询问要覆写该文件，如果 询问 且 用户选择覆写，则认为该文件不存在
 * @return {Promise} 返回延迟结果，true 为文件已存在，false 为文件不存在 或 文件已存在但决定覆盖
 */
function checkExist(filePath: string, askForOverWrite = false) {
  return new Promise((resolve) => {
    const fileStat = hasFile(filePath);
    if (fileStat && fileStat.isFile()) {
      if (askForOverWrite) {
        prompt.askIfORNot(`${filePath}文件已存在，是否要覆盖`).then((res) => {
          if (res.yesOrNot) {
            resolve(false);
          } else {
            resolve(true);
          }
        });
      } else {
        resolve(true);
      }
    } else {
      resolve(false);
    }
  });
}

/**
 * 检查文件夹是否存在
 * @param {String} path 路径
 * @param {Boolean} askForOverWrite 是否询问要覆写该文件夹下内容，如果 询问 且 用户选择覆写，则认为该文件夹不存在
 * @return {Promise} 返回延迟结果，true 为文件夹已存在，false 为文件夹不存在 或 文件夹已存在但决定覆盖
 */
function checkExistFolder(path: string, askForOverWrite = false) {
  return new Promise((resolve) => {
    const fileStat = hasFile(path);
    if (fileStat && fileStat.isDirectory()) {
      if (askForOverWrite) {
        prompt.askIfORNot(`${path}路径已存在，是否要覆盖`).then((res) => {
          if (res.yesOrNot) {
            resolve(false);
          } else {
            resolve(true);
          }
        });
      } else {
        resolve(true);
      }
    } else {
      resolve(false);
    }
  });
}

/**
 * 同步修改文件内容
 * @param {String} filePath 文件路径
 * @param {String} encode 文件读取&写入编码方式 默认utf-8
 * @param {Regexp} pattern 修改部分匹配正则
 * @param {String} replace 被替换的内容
 * @return {Boolean} 替换结果，true为成功，false为失败
 */
function syncModifyFile(filePath: string, encode = 'utf8', pattern: RegExp, replace: string) {
  let fileContent;
  try {
    fileContent = fs.readFileSync(filePath, encode);
  } catch (err) {
    console.log(chalk.red(`read ${filePath} failed`));
    return false;
  }
  const newFileContent = fileContent.replace(pattern, replace);
  try {
    fs.writeFileSync(filePath, newFileContent);
  } catch (err) {
    console.log(chalk.red(`modify ${filePath} failed`));
    return false;
  }
  return true;
}

export default {
  hasFile,
  checkExist,
  syncModifyFile,
  checkExistFolder,
};
