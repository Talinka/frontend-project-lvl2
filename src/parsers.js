import { has } from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';

const parser = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

const getDataObj = (data, format) => {
  if (!has(parser, format)) {
    throw new Error(`Unknown config fromat: ${format}`);
  }
  return parser[format](data);
};

export default getDataObj;
