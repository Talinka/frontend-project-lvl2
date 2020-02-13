import yaml from 'js-yaml';
import ini from 'ini';

const parser = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

const getDataObj = (data, format) => parser[format](data);

export default getDataObj;
