import path from 'path';
import { readFileSync } from 'fs';
import parse from './parsers';
import buildDiff from './builder';
import render from './formatters';

const getConfigData = (configPath) => {
  const ext = path.extname(configPath);
  return {
    dataFormat: (ext ? ext.slice(1) : 'json'),
    data: readFileSync(configPath, 'utf-8'),
  };
};

const genDiff = (configFile1, configFile2, format = 'tree') => {
  const configData1 = getConfigData(configFile1);
  const configData2 = getConfigData(configFile2);
  const configObj1 = parse(configData1.data, configData1.dataFormat);
  const configObj2 = parse(configData2.data, configData2.dataFormat);
  const diff = buildDiff(configObj1, configObj2);
  return render(diff, format);
};

export default genDiff;
