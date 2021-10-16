/* eslint-disable @typescript-eslint/no-var-requires */
const dotenvFlow = require('dotenv-flow');
const path = require('path');
const fs = require('fs');

function checkFileExistsSync(filepath) {
  let flag = true;
  try {
    fs.accessSync(filepath, fs.constants.F_OK);
  } catch (e) {
    flag = false;
  }
  return flag;
}

let files = [
  path.join(__dirname, '.env'),
  path.join(__dirname, '.env.local'),
];

if (process.env.NODE_ENV) {
  files.push(path.join(__dirname, `.env.${process.env.NODE_ENV}`));
  files.push(path.join(__dirname, `.env.${process.env.NODE_ENV}.local`));
}

files = files.filter((file) => checkFileExistsSync(file));

dotenvFlow.load(files);
