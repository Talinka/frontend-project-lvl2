import { readFileSync } from 'fs';
import path from 'path';
import yaml from 'js-yaml';
// import ini from 'ini';

const parser = {
  json: JSON.parse,
  yml: yaml.safeLoad,
};

const getDataObj = (configPath) => {
  const ext = path.extname(configPath);
  const format = ext ? ext.slice(1) : 'json';
  const data = readFileSync(configPath, 'utf-8');
  return parser[format](data);
};

export default getDataObj;
